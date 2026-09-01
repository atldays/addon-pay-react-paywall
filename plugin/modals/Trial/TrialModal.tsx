import React, {forwardRef, memo, useCallback, useMemo, useRef} from "react";

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
    Scroll,
    Status,
    Subtitle,
    Title,
} from "../../components";

import {useAddonPay} from "../../provider";

import {getDiffDays} from "../../utils";

import {SubscriptionStatus} from "../../types";
import {openAddEmailPage} from "../../page";

export interface TrialModalProps extends Partial<ModalProps> {}

const TrialModal = forwardRef<ModalActions, TrialModalProps>((props, ref) => {
    const {t, choice} = useLocale();

    const {status, trial, trialPreview, changeStatus} = useAddonPay();
    const {currentTime} = useCurrentTime();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const pickersRef = useRef<PickersActions>(null);

    const isTrialPreview = status === SubscriptionStatus.TrialPreview;

    const subtitleText = useMemo(() => {
        if (status === SubscriptionStatus.Trial && trial) {
            return t("addon_pay.modals.trial.subtitle");
        }

        if (status === SubscriptionStatus.TrialPreview && trialPreview) {
            const count = 7 - Math.abs(getDiffDays(trialPreview.endAt, currentTime));
            const days = choice("addon_pay.days", count);
            return t("addon_pay.modals.trial_preview.subtitle", {count, days}).replace("!", "$");
        }
    }, [choice, currentTime, status, t, trial, trialPreview]);

    const statusText = useMemo(() => {
        if (status === SubscriptionStatus.Trial && trial) {
            const count = getDiffDays(trial.endAt, currentTime);
            return t("addon_pay.modals.trial.tag", {value: choice("addon_pay.days_with_count", count, {count})});
        }

        if (status === SubscriptionStatus.TrialPreview && trialPreview) {
            const count = getDiffDays(trialPreview.endAt, currentTime);
            return t("addon_pay.modals.trial_preview.tag", {
                value: choice("addon_pay.days_with_count", count, {count}),
            });
        }
    }, [choice, currentTime, status, t, trial, trialPreview]);

    const descriptionText = useMemo(() => {
        const name = t("addon_pay.ext_name");

        if (status === SubscriptionStatus.Trial && trial) {
            return t("addon_pay.modals.trial.description", {name}).replace("!", "$");
        }

        if (status === SubscriptionStatus.TrialPreview && trialPreview) {
            return t("addon_pay.modals.trial_preview.description", {name}).replace("!", "$");
        }
    }, [status, t, trial, trialPreview]);

    const handlePrimaryAction = useCallback(() => {
        changeStatus(SubscriptionStatus.Pro, pickersRef.current?.getValue());
        modalRef.current?.close();
    }, [changeStatus, modalRef]);

    const handleSecondaryAction = useCallback(() => {
        openAddEmailPage().catch(console.error);
        modalRef.current?.close();
    }, [modalRef]);

    return (
        <Modal {...props} ref={setModalRef}>
            <Scroll>
                <Title bottom={12} text={t("addon_pay.ext_name")} showPro={true} />

                {statusText && <Status bottom={17} text={statusText} />}

                <FeaturesList bottom={31} />

                {subtitleText && <Subtitle bottom={26} text={subtitleText} />}

                <Pickers bottom={26} ref={pickersRef} />

                <Actions
                    primaryLabel={
                        isTrialPreview
                            ? t("addon_pay.modals.trial_preview.primary_action")
                            : t("addon_pay.modals.trial.primary_action")
                    }
                    secondaryLabel={isTrialPreview ? t("addon_pay.modals.trial_preview.secondary_action") : undefined}
                    secondaryNote={
                        isTrialPreview ? t("addon_pay.modals.trial_preview.secondary_action_note") : undefined
                    }
                    description={descriptionText}
                    onPrimaryClick={handlePrimaryAction}
                    onSecondaryClick={handleSecondaryAction}
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
    );
});

export default memo(TrialModal);
