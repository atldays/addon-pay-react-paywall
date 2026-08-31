import React, {forwardRef, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState} from "react";

import confetti from "canvas-confetti";

import {useLocale} from "adnbn/locale/react";

import {useCurrentTime, useForwardedRef} from "../../hooks";

import {
    Actions,
    FeaturesList,
    Footer,
    LinkButton,
    Modal,
    ModalActions,
    ModalProps,
    Pickers,
    PickersActions,
    Rating,
    RestoreButton,
    Scroll,
    Subtitle,
    Title,
} from "../../components";

import {GiftStartModal, TrialActivatingModal, TrialStartModal} from "../../modals";

import {useAddonPay} from "../../provider";

import {PaywallModalType, SubscriptionStatus} from "../../types";

import {getAddonPayPaywallOptions} from "../../api";
import {openAddEmailPage} from "../../page";
import {getDiffDays} from "../../utils";

import styles from "./paywall-modal.scss";

export interface PaywallModalProps extends Partial<ModalProps> {
    type: string;
}

const PaywallModal = forwardRef<ModalActions, PaywallModalProps>((props, ref) => {
    const {type, className, ...other} = props;

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");

    const {currentTime} = useCurrentTime();

    const {trustedUserCount = "20,000", trustedRating = 4.5} = getAddonPayPaywallOptions();

    const {t} = useLocale();

    const {status, gift, trialPreview, trial, pro, changeStatus} = useAddonPay();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const giftStartModalRef = useRef<ModalActions>(null);
    const trialStartModalRef = useRef<ModalActions>(null);
    const trialActivatingModalRef = useRef<ModalActions>(null);

    const pickersRef = useRef<PickersActions>(null);

    const showAnimation = () => {
        confetti({
            particleCount: 100,
            spread: 90,
            origin: {x: 0.5, y: 0.2},
            zIndex: 999999999,
        });
    };

    const secondaryLabel = useMemo(() => {
        if (trial || pro) return;

        if (trialPreview) {
            if (Math.abs(getDiffDays(trialPreview.startAt, currentTime)) < 7) {
                return t("addon_pay.modals.paywall.default.secondary_action_after_trial_preview");
            } else {
                return;
            }
        }

        return t("addon_pay.modals.paywall.default.secondary_action");
    }, [status, gift, trialPreview, pro, currentTime]);

    const description = useMemo(() => {
        if (!trialPreview && !trial && !pro) {
            return t("addon_pay.modals.paywall.default.description");
        }
        if (trialPreview && getDiffDays(currentTime, trialPreview.startAt) < 7) {
            return t("addon_pay.modals.paywall.default.description_after_trial_preview");
        }

        return t("addon_pay.modals.paywall.default.description_after_trial", {name: t("addon_pay.ext_name")}).replace(
            "!",
            "$"
        );
    }, [trialPreview, trial, pro, currentTime]);

    const primaryActionHandle = useCallback(() => {
        changeStatus(SubscriptionStatus.Pro, pickersRef.current?.getValue());
        modalRef.current?.close();
    }, []);

    const secondaryActionHandle = useCallback(() => {
        if (!status || status === SubscriptionStatus.Free) {
            if (!gift && !trialPreview && !trial) {
                trialActivatingModalRef.current?.open();

                setTimeout(() => modalRef.current?.close(), 300);

                setTimeout(() => {
                    changeStatus(SubscriptionStatus.TrialPreview);
                    trialStartModalRef.current?.open();
                    showAnimation();
                    setTimeout(() => trialActivatingModalRef.current?.close(), 300);
                }, 11000);
            }

            if ((gift || trialPreview) && !trial) {
                openAddEmailPage().catch(console.error);
                setTimeout(() => modalRef.current?.close(), 300);
            }
        }
    }, [status, gift, trialPreview, trial]);

    const closeHandle = useCallback(() => {
        if (!gift && !trialPreview && !trial && !pro) {
            giftStartModalRef.current?.open();

            changeStatus(SubscriptionStatus.Gift);

            showAnimation();

            setTimeout(() => modalRef.current?.close(), 300);
        }
    }, [gift, trialPreview, trial, pro]);

    useEffect(() => {
        //@ts-ignore
        const title = t(`addon_pay.modals.paywall.${type}.title`);
        //@ts-ignore
        const subtitle = t(`addon_pay.modals.paywall.${type}.subtitle`);

        setTitle(title);
        setSubtitle(subtitle);
    }, [type]);

    return (
        <>
            <Modal
                closeButton={{
                    children: t("addon_pay.not_now"),
                    className: styles["paywall-modal__close-button"],
                }}
                onClose={closeHandle}
                className={className}
                {...other}
                ref={setModalRef}
            >
                <RestoreButton />

                <Scroll top={50}>
                    {type === PaywallModalType.Default && (
                        <div className={styles["paywall-modal__rating"]}>
                            <Rating rating={trustedRating} />
                            {t("addon_pay.notes.trusted_by_users", {count: trustedUserCount})}
                        </div>
                    )}

                    <Title bottom={17} text={title} />

                    {type !== PaywallModalType.Default && <Subtitle bottom={28} text={subtitle} />}

                    <FeaturesList bottom={28} />

                    <Pickers ref={pickersRef} bottom={45} />

                    <Actions
                        primaryLabel={t("addon_pay.modals.paywall.default.primary_action")}
                        secondaryLabel={secondaryLabel}
                        secondaryNote={t("addon_pay.modals.paywall.default.secondary_action_note")}
                        description={description}
                        onPrimaryClick={primaryActionHandle}
                        onSecondaryClick={secondaryActionHandle}
                    />
                </Scroll>

                <Footer>
                    <LinkButton>{t("addon_pay.links.privacy_policy")}</LinkButton>
                    <LinkButton>{t("addon_pay.links.terms_of_use")}</LinkButton>
                    <LinkButton showIcon={true} underline={false} asText={true}>
                        {t("addon_pay.notes.no_risk_cancel_anytime")}
                    </LinkButton>
                </Footer>
            </Modal>

            <Suspense>
                <GiftStartModal ref={giftStartModalRef} className={className} />
            </Suspense>

            <Suspense>
                <TrialStartModal ref={trialStartModalRef} className={className} />
            </Suspense>

            <Suspense>
                <TrialActivatingModal ref={trialActivatingModalRef} className={className} />
            </Suspense>
        </>
    );
});

export default memo(PaywallModal);
