import React, {forwardRef, memo, useCallback} from "react";

import {useLocale} from "adnbn/locale/react";

import {useForwardedRef} from "../../hooks";

import {
    Actions,
    FeaturesList,
    Footer,
    Title,
    LinkButton,
    Modal,
    ModalActions,
    ModalProps,
    Scroll,
    Status,
    StatusType, Subtitle
} from "../../components";

import {useAddonPay} from "../../provider";

import {SubscriptionStatus} from "../../types";

export interface BillingFailedModalProps extends Partial<ModalProps> {

}

const BillingFailedModal = forwardRef<ModalActions, BillingFailedModalProps>((props, ref) => {
    const {t} = useLocale();

    const {changeStatus, resetPaidOptions} = useAddonPay();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const handlePrimaryAction = useCallback(() => {
        changeStatus(SubscriptionStatus.Pro);
        modalRef.current?.close();
    }, []);

    const handleClose = useCallback(() => {
        changeStatus(SubscriptionStatus.Free);
        resetPaidOptions().catch(console.error);
    }, [resetPaidOptions]);

    return (
        <Modal {...props} onClose={handleClose} ref={setModalRef}>

            <Scroll top={50}>
                <Status bottom={11} text={t("addon_pay.tags.payment_needs_attention")} type={StatusType.Error}/>

                <Title bottom={22} text={t("addon_pay.modals.billing_failed.title")}/>

                <Subtitle bottom={23} text={t("addon_pay.modals.billing_failed.subtitle")}/>

                <FeaturesList bottom={23}/>

                <Actions
                    primaryLabel={t("addon_pay.modals.billing_failed.primary_action")}
                    onPrimaryClick={handlePrimaryAction}
                />
            </Scroll>

            <Footer>
                <LinkButton>{t("addon_pay.links.privacy_policy")}</LinkButton>
                <LinkButton>{t("addon_pay.links.terms_of_use")}</LinkButton>
            </Footer>
        </Modal>
    );
});

export default memo(BillingFailedModal);
