import React, {forwardRef, memo, useCallback, useMemo} from "react";

import {addDays, format} from "date-fns";

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
    Scroll,
    Status,
    Subtitle,
    Title,
} from "../../components";

import {getDateString, getDiffDays} from "../../utils";

import {useAddonPay} from "../../provider";
import {SubscriptionStatus} from "../../types";

export interface TrialStartModalProps extends Partial<ModalProps> {}

const TrialStartModal = forwardRef<ModalActions, TrialStartModalProps>((props, ref) => {
    const {t, choice} = useLocale();

    const {status, trial, trialPreview} = useAddonPay();
    const {currentTime} = useCurrentTime();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const statusText = useMemo(() => {
        if (status === SubscriptionStatus.Trial && trial) {
            const count = getDiffDays(trial.endAt, currentTime);
            const value = choice("addon_pay.days_with_count", count, {count});
            return t("addon_pay.tags.trial_remaining", {value});
        }

        if (status === SubscriptionStatus.TrialPreview && trialPreview) {
            //const count = getDiffDays(trialPreview.endAt, currentTime);
            const value = choice("addon_pay.days_with_count", 7, {count: "7"});
            return t("addon_pay.tags.trial_remaining", {value});
        }
    }, [choice, currentTime, status, t, trial, trialPreview]);

    const subtitleText = useMemo(() => {
        if (status === SubscriptionStatus.Trial && trial) {
            const date = format(trial.endAt, "MMMM d, yyyy");
            return t("addon_pay.modals.trial_start.subtitle", {date, name: t("addon_pay.ext_name")});
        }
        if (status === SubscriptionStatus.TrialPreview && trialPreview) {
            const date = getDateString(addDays(new Date(trialPreview.startAt), 7).getTime());
            // const date = format(trialPreview.endAt, 'MMMM d, yyyy');
            return t("addon_pay.modals.trial_start.subtitle", {date, name: t("addon_pay.ext_name")});
        }
    }, [status, t, trial, trialPreview]);

    const handlePrimaryAction = useCallback(() => {
        modalRef.current?.close();
    }, [modalRef]);

    return (
        <Modal {...props} ref={setModalRef}>
            <Scroll>
                <Title bottom={12} text={t("addon_pay.modals.trial_start.title")} showPro={true} />

                {statusText && <Status bottom={17} text={statusText} />}

                {subtitleText && <Subtitle bottom={23} text={subtitleText} />}

                <FeaturesList bottom={50} />

                <Actions
                    primaryLabel={t("addon_pay.modals.trial_start.primary_action")}
                    onPrimaryClick={handlePrimaryAction}
                />
            </Scroll>

            <Footer>
                <LinkButton underline={false} asText={true}>
                    {t("addon_pay.notes.your_trial_ends_automatically")}
                </LinkButton>
                <LinkButton showIcon={true} underline={false} asText={true}>
                    {t("addon_pay.notes.no_credit_card_required")}
                </LinkButton>
            </Footer>
        </Modal>
    );
});

export default memo(TrialStartModal);
