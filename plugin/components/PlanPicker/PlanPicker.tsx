import React, {FC, memo, useCallback} from "react";
import classnames from "classnames";

import {useLocale} from "adnbn/locale/react";

import {SubscriptionPlan} from "../../types";

import styles from "./plan-picker.scss";

export interface PlanPickerProps {
    name: string;
    value: SubscriptionPlan;
    checked: boolean;
    title: string;
    subTitle: React.ReactNode;
    description: React.ReactNode;
    badge?: React.ReactNode;
    className?: string;
    cardClassName?: string;
    contentClassName?: string;
    wrapClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    descriptionClassName?: string;
    onChange: (value: SubscriptionPlan) => void;
}

const PlanPicker: FC<PlanPickerProps> = props => {
    const {
        name,
        value,
        title,
        subTitle,
        description,
        checked,
        badge,
        className,
        cardClassName,
        contentClassName,
        wrapClassName,
        titleClassName,
        subtitleClassName,
        descriptionClassName,
        onChange,
    } = props;

    const {dir} = useLocale();

    const change = useCallback(() => onChange(value), [onChange, value]);

    return (
        <div
            className={classnames(
                styles["plan-picker"],
                {
                    [styles["plan-picker--active"]]: checked,
                },
                className
            )}
            dir={dir}
        >
            {badge && <div className={styles["plan-picker__badge"]}>{badge}</div>}

            <label className={classnames(styles["plan-picker__card"], cardClassName)} dir={dir}>
                <input
                    type="radio"
                    name={name}
                    checked={checked}
                    onChange={change}
                    className={styles["plan-picker__input"]}
                />

                <div className={classnames(styles["plan-picker__content"], contentClassName)} dir={dir}>
                    <div className={classnames(styles["plan-picker__wrap"], wrapClassName)} dir={dir}>
                        <div className={classnames(styles["plan-picker__title"], titleClassName)}>{title}</div>
                        <div className={classnames(styles["plan-picker__subtitle"], subtitleClassName)}>{subTitle}</div>
                    </div>

                    <div className={classnames(styles["plan-picker__description"], descriptionClassName)}>
                        {description}
                    </div>
                </div>
            </label>
        </div>
    );
};

export default memo(PlanPicker);
