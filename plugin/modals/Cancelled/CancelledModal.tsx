import React, {forwardRef, memo, useCallback, useMemo} from "react";


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
    Scroll,
    Status,
    Subtitle,
    Title,
} from "../../components";

import {useAddonPay} from "../../provider";
import {getDateString} from "../../utils";
import {SubscriptionPlan} from "../../types";

export interface BeforeCancelModalProps extends Partial<ModalProps> {

}

const CancelledModal = forwardRef<ModalActions, BeforeCancelModalProps>((props, ref) => {
    const {t} = useLocale();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const {pro, update} = useAddonPay();

    const statusText = useMemo(() => {
        if (pro) {
            const dateString = getDateString(pro.endAt);

            return pro.plan === SubscriptionPlan.Yearly
                ? t("addon_pay.tags.yearly_plan_access_until", {date: dateString, value: '29.99'}).replace('!', '$')
                : t("addon_pay.tags.monthly_plan_access_until", {date: dateString});
        }
    }, [pro]);

    const handlePrimaryAction = useCallback(() => {
        modalRef.current?.close();
        update({renewAfterEnd: true});
    }, []);

    return (
        <>
            <Modal {...props} ref={setModalRef}>
                <Scroll>
                    {statusText && <Status bottom={16} text={statusText}/>}

                    <Title bottom={10} text={t("addon_pay.modals.cancelled.title")}/>

                    <Subtitle
                        bottom={23}
                        text={t("addon_pay.modals.cancelled.subtitle", {date: pro?.endAt ? getDateString(pro.endAt) : ''})}
                    />

                    <FeaturesList bottom={34}/>

                    <div style={{height: 1, width: '100%', backgroundColor: '#252424'}}/>

                    <Subtitle
                        top={25}
                        bottom={18}
                        text={t("addon_pay.modals.cancelled.subtitle_2").replace('!', '$')}
                    />

                    <Actions
                        primaryLabel={t("addon_pay.modals.cancelled.primary_action")}
                        onPrimaryClick={handlePrimaryAction}
                    />
                </Scroll>

                <Footer>
                    <LinkButton>{t("addon_pay.links.privacy_policy")}</LinkButton>
                    <LinkButton>{t("addon_pay.links.terms_of_use")}</LinkButton>
                </Footer>
            </Modal>
        </>
    );
});

export default memo(CancelledModal);
