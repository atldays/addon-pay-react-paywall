import React, {ComponentProps, forwardRef, memo, useImperativeHandle, useState} from "react";

import classnames from "classnames";

import {useLocale} from "adnbn/locale/react";

import {Truncate} from "addon-ui";

import {Badge, PlanPicker, Tag} from "../index";

import {ComponentMargin, SubscriptionPlan} from "../../types";

import styles from "./pickers.scss";

export interface PickersProps extends ComponentProps<"section">, ComponentMargin {
    value?: SubscriptionPlan;
    defaultValue?: SubscriptionPlan;
    onChangeValue?: (value: SubscriptionPlan) => void;
}

export interface PickersActions {
    getValue: () => SubscriptionPlan;
}

const Pickers = forwardRef<PickersActions, PickersProps>((props, ref) => {
    const {
        defaultValue = SubscriptionPlan.Yearly,
        value,
        onChangeValue,
        top,
        bottom,
        style,
        className,
        ...other
    } = props;

    const [plan, setPlan] = useState(defaultValue);

    const {t, dir} = useLocale();

    useImperativeHandle(
        ref,
        () => ({
            getValue: () => plan,
        }),
        [plan]
    );

    return (
        <section
            className={classnames(styles["pickers"], className)}
            style={{marginTop: top, marginBottom: bottom, ...style}}
            dir={dir}
            {...other}
        >
            <PlanPicker
                name="plan"
                value={SubscriptionPlan.Monthly}
                checked={(value ?? plan) === SubscriptionPlan.Monthly}
                title={t("addon_pay.monthly")}
                subTitle="$4.99"
                description={t("addon_pay.cost_in_week", {value: "1.15"}).replace("!", "$")}
                className={styles["pickers__picker"]}
                contentClassName={styles["pickers__picker-content"]}
                descriptionClassName={styles["pickers__picker-description"]}
                onChange={onChangeValue ?? setPlan}
            />

            <PlanPicker
                name="plan"
                value={SubscriptionPlan.Yearly}
                checked={(value ?? plan) === SubscriptionPlan.Yearly}
                title={t("addon_pay.yearly")}
                subTitle="$29.99"
                description={
                    <>
                        <Tag>{t("addon_pay.save_percentage", {value: "50"})}</Tag>
                        <Truncate text={t("addon_pay.cost_in_week", {value: "0.58"}).replace("!", "$")} />
                    </>
                }
                badge={<Badge text={t("addon_pay.picker_badge")} height={17} />}
                className={styles["pickers__picker"]}
                contentClassName={styles["pickers__picker-content"]}
                descriptionClassName={styles["pickers__picker-description"]}
                onChange={onChangeValue ?? setPlan}
            />
        </section>
    );
});

export default memo(Pickers);
