import React, {forwardRef, memo} from "react";

import {useLocale} from "adnbn/locale/react";

import {Modal, ModalActions, ModalProps, Scroll, Title} from "../../components";

export interface NoInternetModalProps extends Partial<ModalProps> {}

const NoInternetModal = forwardRef<ModalActions, NoInternetModalProps>((props, ref) => {
    const {t} = useLocale();

    return (
        <Modal {...props} ref={ref}>
            <Scroll>
                <Title
                    text={t("addon_pay.modals.trial_activating.no_internet")}
                    style={{fontSize: "18px", fontWeight: 600}}
                />
            </Scroll>
        </Modal>
    );
});

export default memo(NoInternetModal);
