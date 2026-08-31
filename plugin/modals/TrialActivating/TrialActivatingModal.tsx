import React, {forwardRef, memo} from "react";

import {useLocale} from "adnbn/locale/react";

import {Footer, LinkButton, Modal, ModalActions, ModalProps, Scroll} from "../../components";

import styles from "./trial-activating-modal.scss";

export interface TrialActivatingModalProps extends Partial<ModalProps> {}

const TrialActivatingModal = forwardRef<ModalActions, TrialActivatingModalProps>((props, ref) => {
    const {t} = useLocale();

    return (
        <Modal {...props} ref={ref}>
            <Scroll>
                <div className={styles["trial-activating-modal__container"]}>
                    <div className={styles["trial-activating-modal__title-wrap"]}>
                        <div className={styles["trial-activating-modal__title"]}>
                            {t("addon_pay.modals.trial_activating.title_1")}
                        </div>
                        <div className={styles["trial-activating-modal__title"]}>
                            {t("addon_pay.modals.trial_activating.title_2")}
                        </div>
                        <div className={styles["trial-activating-modal__title"]}>
                            {t("addon_pay.modals.trial_activating.title_3")}
                        </div>
                    </div>

                    <div className={styles["trial-activating-modal__subtitle"]}>
                        {t("addon_pay.modals.trial_activating.subtitle", {name: t("addon_pay.ext_name")})}
                    </div>
                </div>
            </Scroll>

            <Footer>
                <LinkButton>{t("addon_pay.links.privacy_policy")}</LinkButton>
                <LinkButton>{t("addon_pay.links.terms_of_use")}</LinkButton>
            </Footer>
        </Modal>
    );
});

export default memo(TrialActivatingModal);
