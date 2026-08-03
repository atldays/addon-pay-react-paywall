import React, {forwardRef, memo, useCallback} from "react";

import {Tag, Truncate} from "addon-ui";

import {useLocale} from "adnbn/locale/react";

import {useForwardedRef} from "../../hooks";

import {
    Actions,
    ActionsProps,
    FeaturesList,
    Footer,
    LinkButton,
    Modal,
    ModalActions,
    ModalProps,
    PlanPicker,
    Scroll,
    Subtitle,
    Title
} from "../../components";

import {useAddonPay} from "../../provider";

import {SubscriptionPlan} from "../../types";

import styles from "./offer-modal.scss";

export interface OfferModalProps extends Partial<ModalProps>, Pick<ActionsProps, 'onSecondaryClick'> {

}

const OfferModal = forwardRef<ModalActions, OfferModalProps>((props, ref) => {
    const {onSecondaryClick, ...other} = props;

    const {t} = useLocale();

    const {update} = useAddonPay();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const handlePrimaryAction = useCallback(() => {
        update({hasDiscount: true});
        modalRef.current?.close();
    }, []);

    const handleSecondaryAction = useCallback(() => {
        update({renewAfterEnd: false});
        setTimeout(() => modalRef.current?.close(), 300);
    }, [onSecondaryClick]);

    return (
        <Modal {...other} ref={setModalRef}>

            <Scroll>
                <Title bottom={17} text={t("addon_pay.modals.offer.title")}/>

                <Subtitle bottom={25} text={t("addon_pay.modals.offer.subtitle").replace('!', '$')}/>

                <FeaturesList/>

                <PlanPicker
                    name="plan"
                    value={SubscriptionPlan.Yearly}
                    checked={true}
                    title={t("addon_pay.yearly")}
                    subTitle={
                        <div className={styles["offer-modal__picker-subtitle"]}>
                            <span>$29.99</span>
                            <span>$20.99</span>
                        </div>}
                    description={
                        <div className={styles["offer-modal__picker-description"]}>
                            <Tag
                                className={styles["offer-modal__picker-tag"]}>{t("addon_pay.save_percentage", {value: "30"})}</Tag>
                            <Truncate text={t("addon_pay.cost_in_week", {value: "0.40"}).replace("!", "$")}/>
                        </div>}
                    className={styles["offer-modal__picker"]}
                    titleClassName={styles["offer-modal__picker-title"]}
                    contentClassName={styles["offer-modal__picker-content"]}
                    onChange={() => null}
                />

                <Actions
                    primaryLabel={t("addon_pay.modals.offer.primary_action")}
                    secondaryLabel={t("addon_pay.modals.offer.secondary_action")}
                    description={t("addon_pay.modals.offer.description", {name: t("addon_pay.ext_name")}).replace('!', '$')}
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

export default memo(OfferModal);
