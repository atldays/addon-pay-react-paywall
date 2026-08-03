import React, {forwardRef, memo, useCallback, useMemo, useRef, useState} from "react";

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
    Scroll,
    Status,
    Subtitle,
    Title
} from "../../components";

import {useAddonPay} from "../../provider";

import {getDiffDays} from "../../utils";

import {useCurrentTime} from "../../hooks";

import {SubscriptionPlan, SubscriptionStatus} from "../../types";

export interface GiftModalProps extends Partial<ModalProps> {

}

const GiftModal = forwardRef<ModalActions, GiftModalProps>((props, ref) => {
    const [plan, setPlan] = useState(SubscriptionPlan.Yearly);

    const {t, choice} = useLocale();

    const {gift, changeStatus} = useAddonPay();
    const {currentTime} = useCurrentTime();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const pickersRef = useRef<PickersActions>(null);

    const statusText = useMemo(() => {
        if (gift) {
            const count = getDiffDays(gift.endAt, currentTime);
            const days = choice("addon_pay.days_with_count", count, {count});
            return t("addon_pay.tags.gift_remaining", {value: days});
        }
    }, [gift, currentTime]);

    const actionText = useMemo(() => {
        const value = plan === SubscriptionPlan.Yearly ? "29.99/year" : "4.99/month";
        return t("addon_pay.modals.gift.primary_action", {value});
    }, [plan]);

    const handlePrimaryAction = useCallback(() => {
        changeStatus(SubscriptionStatus.Pro, plan);
        modalRef.current?.close();
    }, [plan]);

    return (
        <Modal {...props} ref={setModalRef}>

            <Scroll>
                <Title bottom={12} text={t("addon_pay.ext_name")} showPro={true}/>

                {statusText && <Status bottom={17} text={statusText}/>}

                <FeaturesList bottom={20}/>

                <Subtitle bottom={26} text={t("addon_pay.modals.gift.subtitle").replace('!', '$')}/>

                <Pickers bottom={26} ref={pickersRef} value={plan} onChangeValue={setPlan}/>

                <Actions
                    primaryLabel={actionText}
                    description={t("addon_pay.modals.gift.description", {name: t("addon_pay.ext_name").replace('!', '$')})}
                    onPrimaryClick={handlePrimaryAction}
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

export default memo(GiftModal);
