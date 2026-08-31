import React, {forwardRef, memo, Suspense, useCallback, useRef} from "react";

import {useLocale} from "adnbn/locale/react";

import {useForwardedRef} from "../../hooks";

import {
    Actions,
    FeaturesList,
    FeaturesListType,
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

import {CancelledModal, OfferModal} from "../../modals";

import {useAddonPay} from "../../provider";
import {getDateString} from "../../utils";

import styles from "./before-cancel-modal.scss";

export interface BeforeCancelModalProps extends Partial<ModalProps> {
    statusText?: string;
}

const BeforeCancelModal = forwardRef<ModalActions, BeforeCancelModalProps>((props, ref) => {
    const {statusText, className, ...other} = props;

    const {t} = useLocale();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const offerModal = useRef<ModalActions | null>(null);
    const cancelledModal = useRef<ModalActions | null>(null);

    const {pro, hasDiscount, update} = useAddonPay();

    const handlePrimaryAction = useCallback(() => {
        modalRef.current?.close();
    }, []);

    const handleSecondaryAction = useCallback(() => {
        if (hasDiscount) {
            cancelledModal.current?.open();
            update({renewAfterEnd: false});
        } else {
            offerModal.current?.open();
        }

        setTimeout(() => modalRef.current?.close(), 300);
    }, [hasDiscount]);

    return (
        <>
            <Modal {...other} ref={setModalRef} className={className}>
                <Scroll>
                    <Title bottom={10} text={t("addon_pay.modals.before_cancel.title")} />

                    {statusText && <Status bottom={28} text={statusText} />}

                    {hasDiscount && (
                        <div className={styles["before-cancel-modal__lose-discount"]}>
                            {t("addon_pay.modals.before_cancel.lose_discount")}
                        </div>
                    )}

                    <Subtitle
                        bottom={23}
                        text={t("addon_pay.modals.before_cancel.subtitle", {
                            date: pro?.endAt ? getDateString(pro.endAt) : "",
                        })}
                    />

                    <FeaturesList bottom={30} type={FeaturesListType.Error} />

                    <Actions
                        primaryLabel={t("addon_pay.modals.before_cancel.primary_action")}
                        secondaryLabel={t("addon_pay.modals.before_cancel.secondary_action")}
                        onPrimaryClick={handlePrimaryAction}
                        onSecondaryClick={handleSecondaryAction}
                    />
                </Scroll>

                <Footer>
                    <LinkButton>{t("addon_pay.links.privacy_policy")}</LinkButton>
                    <LinkButton>{t("addon_pay.links.terms_of_use")}</LinkButton>
                    <LinkButton>{t("addon_pay.links.change_plan")}</LinkButton>
                </Footer>
            </Modal>

            <Suspense>
                <OfferModal ref={offerModal} className={className} />
            </Suspense>

            <Suspense>
                <CancelledModal ref={cancelledModal} className={className} />
            </Suspense>
        </>
    );
});

export default memo(BeforeCancelModal);
