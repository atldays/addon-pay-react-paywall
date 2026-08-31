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
    RestoreButton,
    Scroll,
    Status,
    StatusType,
    Subtitle,
    Title,
} from "../../components";

import {useAddonPay} from "../../provider";

import {SubscriptionStatus} from "../../types";
import {getDiffDays} from "../../utils";
import {openAddEmailPage} from "../../page";

export interface TrialEndModalProps extends Partial<ModalProps> {}

const TrialEndModal = forwardRef<ModalActions, TrialEndModalProps>((props, ref) => {
    const {t, choice} = useLocale();

    const {currentTime} = useCurrentTime();

    const {changeStatus, trial, trialPreview} = useAddonPay();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const pickersRef = useRef<PickersActions>(null);

    const trialPreviewDiffDays = useMemo(() => {
        if (trialPreview) return getDiffDays(trialPreview.endAt, currentTime);
    }, [trialPreview, currentTime]);

    const trialDiffDays = useMemo(() => {
        if (trial) return getDiffDays(trial.endAt, currentTime);
    }, [trial, currentTime]);

    const isTrialPreviewEnd = useMemo(() => {
        if (trialDiffDays === 0) return false;

        if (trialPreviewDiffDays !== undefined && trialPreviewDiffDays > -7 && trialPreviewDiffDays <= 0) {
            return true;
        }
    }, [trialDiffDays, trialPreviewDiffDays]);

    const statusText = useMemo(() => {
        if (isTrialPreviewEnd) {
            return t("addon_pay.modals.trial_preview_end.tag", {count: 1, days: choice("addon_pay.days", 1)});
        } else {
            return t("addon_pay.modals.trial_end.tag");
        }
    }, [isTrialPreviewEnd]);

    const titleText = useMemo(() => {
        if (isTrialPreviewEnd) {
            return t("addon_pay.modals.trial_preview_end.title");
        } else {
            return t("addon_pay.modals.trial_end.title");
        }
    }, [isTrialPreviewEnd]);

    const subtitleText = useMemo(() => {
        if (isTrialPreviewEnd && trialPreviewDiffDays !== undefined) {
            const count = 6 - Math.abs(trialPreviewDiffDays);
            const days = choice("addon_pay.days", count);
            return t("addon_pay.modals.trial_preview_end.subtitle", {count, days});
        }
    }, [isTrialPreviewEnd, trialPreviewDiffDays]);

    const descriptionText = useMemo(() => {
        return (
            isTrialPreviewEnd
                ? t("addon_pay.modals.trial_preview_end.description", {name: t("addon_pay.ext_name")})
                : t("addon_pay.modals.trial_end.description", {name: t("addon_pay.ext_name")})
        ).replace("!", "$");
    }, [isTrialPreviewEnd]);

    const handlePrimaryAction = useCallback(() => {
        changeStatus(SubscriptionStatus.Pro, pickersRef.current?.getValue());
        modalRef.current?.close();
    }, []);

    const handleSecondaryAction = useCallback(() => {
        openAddEmailPage().catch(console.error);
        modalRef.current?.close();
    }, []);

    return (
        <Modal {...props} ref={setModalRef}>
            <RestoreButton />

            <Scroll top={50}>
                <Status bottom={11} text={statusText} type={StatusType.Error} />

                <Title bottom={isTrialPreviewEnd ? 7 : 16} text={titleText} />

                {subtitleText && <Subtitle bottom={30} text={subtitleText} />}

                <FeaturesList bottom={23} />

                <Pickers bottom={26} ref={pickersRef} />

                <Actions
                    primaryLabel={
                        isTrialPreviewEnd
                            ? t("addon_pay.modals.trial_preview_end.primary_action")
                            : t("addon_pay.modals.trial_end.primary_action")
                    }
                    secondaryLabel={
                        isTrialPreviewEnd ? t("addon_pay.modals.trial_preview_end.secondary_action") : undefined
                    }
                    secondaryNote={
                        isTrialPreviewEnd ? t("addon_pay.modals.trial_preview_end.secondary_action_note") : undefined
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

export default memo(TrialEndModal);
