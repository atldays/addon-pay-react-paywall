import React, {forwardRef, memo, useCallback, useRef} from "react";

import {useLocale} from "adnbn/locale/react";

import {useForwardedRef} from "../../hooks";

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
import {openAddEmailPage} from "../../page";

export interface GiftEndModalProps extends Partial<ModalProps> {}

const GiftEndModal = forwardRef<ModalActions, GiftEndModalProps>((props, ref) => {
    const {t} = useLocale();

    const {changeStatus} = useAddonPay();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const pickersRef = useRef<PickersActions>(null);

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

            <Scroll>
                <Status bottom={17} type={StatusType.Error} text={t("addon_pay.modals.gift_end.tag")} />

                <Title bottom={12} text={t("addon_pay.modals.gift_end.title")} />

                <Subtitle bottom={26} text={t("addon_pay.modals.gift_end.subtitle").replace("!", "$")} />

                <FeaturesList bottom={20} />

                <Pickers bottom={26} ref={pickersRef} />

                <Actions
                    primaryLabel={t("addon_pay.modals.gift_end.primary_action")}
                    secondaryLabel={t("addon_pay.modals.gift_end.secondary_action")}
                    secondaryNote={t("addon_pay.modals.gift_end.secondary_action_note")}
                    description={t("addon_pay.modals.gift_end.description", {name: t("addon_pay.ext_name")}).replace(
                        "!",
                        "$"
                    )}
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

export default memo(GiftEndModal);
