import React, {forwardRef, memo, useCallback, useMemo} from "react";

import {addDays} from "date-fns";

import {useLocale} from "adnbn/locale/react";

import {useForwardedRef} from "../../hooks";

import {
    Actions,
    Footer,
    LinkButton,
    Modal,
    ModalActions,
    ModalProps,
    Scroll,
    Status,
    StatusType,
    Subtitle,
    Title,
} from "../../components";

import {useAddonPay} from "../../provider";

import {getDateString} from "../../utils";

import {SubscriptionStatus} from "../../types";

export interface BillingFailedModalProps extends Partial<ModalProps> {}

const BillingGraceModal = forwardRef<ModalActions, BillingFailedModalProps>((props, ref) => {
    const {t} = useLocale();

    const {pro, changeStatus} = useAddonPay();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const handlePrimaryAction = useCallback(() => {
        changeStatus(SubscriptionStatus.Pro);
        modalRef.current?.close();
    }, [changeStatus, modalRef]);

    const handleSecondaryAction = useCallback(() => {
        // modalRef.current?.close();
        // TODO Contact support
    }, []);

    const graceDate = useMemo(() => {
        if (pro) {
            return getDateString(addDays(new Date(pro?.endAt), 7).getTime());
        }
    }, [pro]);

    return (
        <Modal {...props} ref={setModalRef}>
            <Scroll top={50}>
                <Status bottom={11} text={t("addon_pay.tags.payment_needs_attention")} type={StatusType.Error} />

                <Title bottom={17} text={t("addon_pay.modals.billing_grace.title")} />

                {graceDate && (
                    <Subtitle bottom={22} text={t("addon_pay.modals.billing_grace.subtitle", {date: graceDate})} />
                )}

                <Actions
                    primaryLabel={t("addon_pay.modals.billing_grace.primary_action")}
                    secondaryLabel={t("addon_pay.modals.billing_grace.secondary_action")}
                    onPrimaryClick={handlePrimaryAction}
                    onSecondaryClick={handleSecondaryAction}
                />
            </Scroll>

            <Footer>
                <LinkButton>{t("addon_pay.links.privacy_policy")}</LinkButton>
                <LinkButton>{t("addon_pay.links.terms_of_use")}</LinkButton>
            </Footer>
        </Modal>
    );
});

export default memo(BillingGraceModal);
