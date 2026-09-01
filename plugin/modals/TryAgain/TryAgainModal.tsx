import React, {forwardRef, memo, useCallback} from "react";

import {useLocale} from "adnbn/locale/react";

import {useForwardedRef} from "../../hooks";

import {Actions, Footer, LinkButton, Modal, ModalActions, ModalProps, Scroll, Subtitle} from "../../components";

export interface TryAgainModalProps extends Partial<ModalProps> {}

const TryAgainModal = forwardRef<ModalActions, TryAgainModalProps>((props, ref) => {
    const {t} = useLocale();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const handlePrimaryAction = useCallback(() => {
        modalRef.current?.close();
    }, [modalRef]);

    return (
        <Modal {...props} ref={setModalRef}>
            <Scroll>
                <Subtitle
                    bottom={16}
                    text={t("addon_pay.modals.trial_activating.failed_subtitle")}
                    style={{fontSize: "18px", fontWeight: 600}}
                />

                <Actions
                    primaryLabel={t("addon_pay.modals.trial_activating.failed_primary_action")}
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

export default memo(TryAgainModal);
