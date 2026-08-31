import React, {forwardRef, memo, Suspense, useCallback, useMemo, useRef} from "react";

import {Icon} from "addon-ui";

import {useLocale} from "adnbn/locale/react";

import {useForwardedRef} from "../../hooks";

import {Footer, LinkButton, Modal, ModalActions, ModalProps, Scroll, Status, Title} from "../../components";

import {BeforeCancelModal} from "../../modals";

import {useAddonPay} from "../../provider";

import {getDateString} from "../../utils";

import {SubscriptionPlan} from "../../types";

import {getAddonPayPaywallOptions} from "../../api";

import styles from "./features-modal.scss";

export interface FeaturesModalProps extends Partial<ModalProps> {}

const FeaturesModal = forwardRef<ModalActions, FeaturesModalProps>((props, ref) => {
    const {t} = useLocale();

    const {featuresCount, icons} = getAddonPayPaywallOptions();

    const [modalRef, setModalRef] = useForwardedRef(ref);

    const beforeCancelModal = useRef<ModalActions | null>(null);

    const {pro} = useAddonPay();

    const statusText = useMemo(() => {
        if (pro) {
            const dateString = getDateString(pro.endAt);

            return pro.plan === SubscriptionPlan.Yearly
                ? t("addon_pay.tags.yearly_plan_renews", {date: dateString, value: "29.99"}).replace("!", "$")
                : t("addon_pay.tags.monthly_plan_renews", {date: dateString});
        }
    }, [pro]);

    const features = useMemo(() => {
        return Array.from({length: featuresCount}, (_, index) => ({
            // @ts-expect-error -- Locale keys are generated dynamically.
            title: t(`addon_pay.feature_${index + 1}.title`),
            // @ts-expect-error -- Locale keys are generated dynamically.
            description: t(`addon_pay.feature_${index + 1}.description`),
        }));
    }, []);

    const handleCancel = useCallback(() => {
        modalRef.current?.close();
        beforeCancelModal.current?.open();
    }, []);

    return (
        <>
            <Modal {...props} ref={setModalRef}>
                <Scroll>
                    <Title bottom={10} text={t("addon_pay.modals.features.title")} showPro={true} />

                    {statusText && <Status bottom={28} text={statusText} />}

                    <section className={styles["features-modal__features"]}>
                        {features.map(({title, description}) => (
                            <div className={styles["features-modal__feature"]} key={title}>
                                {icons?.successFeature && (
                                    <Icon
                                        name={icons.successFeature}
                                        size={18}
                                        className={styles["features-modal__feature-icon"]}
                                    />
                                )}
                                <div>
                                    <h3 className={styles["features-modal__feature-title"]}>{title}</h3>
                                    <p className={styles["features-modal__feature-description"]}>{description}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                </Scroll>

                <Footer>
                    <LinkButton>{t("addon_pay.links.privacy_policy")}</LinkButton>
                    <LinkButton>{t("addon_pay.links.terms_of_use")}</LinkButton>
                    <LinkButton>{t("addon_pay.links.manage_billing")}</LinkButton>
                    <LinkButton>{t("addon_pay.links.change_plan")}</LinkButton>
                    <LinkButton onClick={handleCancel}>{t("addon_pay.links.cancel")}</LinkButton>
                </Footer>
            </Modal>

            <Suspense>
                <BeforeCancelModal ref={beforeCancelModal} statusText={statusText} className={props.className} />
            </Suspense>
        </>
    );
});

export default memo(FeaturesModal);
