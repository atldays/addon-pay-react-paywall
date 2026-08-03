import React, {forwardRef, memo, useCallback, useMemo} from "react";

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
    Title
} from "../../components";

import {getDiffDays} from "../../utils";

import {useAddonPay} from "../../provider";

export interface GiftStartModalProps extends Partial<ModalProps> {

}

const GiftStartModal = forwardRef<ModalActions, GiftStartModalProps>((props, ref) => {
    const {t, choice} = useLocale();

    const {gift} = useAddonPay();
    const {currentTime} = useCurrentTime();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const statusText = useMemo(() => {
        if (gift) {
            const count = getDiffDays(gift.endAt, currentTime);
            const days = choice("addon_pay.days_with_count", count, {count});
            return t("addon_pay.tags.gift_remaining", {value: days});
        }
    }, [gift, currentTime]);

    const subtitleText = useMemo(() => {
        const name = t("addon_pay.ext_name");
        const days = choice("addon_pay.days_with_count", 1, {count: 1});
        return t("addon_pay.modals.gift_start.subtitle", {days, name});
    }, []);

    const handlePrimaryAction = useCallback(() => {
        modalRef.current?.close();
    }, []);

    return (
        <Modal {...props} ref={setModalRef}>

            <Scroll>
                <Title bottom={12} text={t("addon_pay.modals.gift_start.title")}/>

                {statusText && <Status bottom={17} text={statusText}/>}

                <Subtitle bottom={23} text={subtitleText}/>

                <FeaturesList bottom={50}/>

                <Actions
                    primaryLabel={t("addon_pay.modals.gift_start.primary_action")}
                    onPrimaryClick={handlePrimaryAction}
                />
            </Scroll>

            <Footer>
                <LinkButton underline={false} asText={true}>
                    {t("addon_pay.notes.your_gift_ends_automatically")}
                </LinkButton>
                <LinkButton showIcon={true} underline={false} asText={true}>
                    {t("addon_pay.notes.no_credit_card_required")}
                </LinkButton>
            </Footer>
        </Modal>
    );
});

export default memo(GiftStartModal);
