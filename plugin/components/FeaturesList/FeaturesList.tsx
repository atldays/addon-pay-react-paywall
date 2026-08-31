import React, {ComponentProps, memo, useMemo} from "react";
import classnames from "classnames";

import {useLocale} from "adnbn/locale/react";

import {Icon} from "addon-ui";

import {ComponentMargin} from "../../types";

import styles from "./features-list.scss";
import {getAddonPayPaywallOptions} from "../../api";

export enum FeaturesListType {
    Success = "success",
    Error = "error",
}

interface FeaturesListProps extends ComponentProps<"section">, ComponentMargin {
    type?: FeaturesListType;
}

const FeaturesList = (props: FeaturesListProps) => {
    const {top, bottom, style, className, type = FeaturesListType.Success, ...other} = props;

    const {t, dir} = useLocale();

    const {shortFeaturesCount, icons} = getAddonPayPaywallOptions();

    const [leftFeatures, rightFeatures] = useMemo(() => {
        const features = Array.from({length: shortFeaturesCount}, (_, index) =>
            // @ts-ignore
            t(`addon_pay.feature_${index + 1}.title`)
        );

        const leftCount = Math.ceil(features.length / 2);

        return [features.slice(0, leftCount), features.slice(leftCount)];
    }, []);

    const iconName = type === FeaturesListType.Success ? icons?.successFeature : icons?.errorFeature;

    return (
        <section
            className={classnames(styles["features-list"], className)}
            style={{marginTop: top, marginBottom: bottom, ...style}}
            {...other}
        >
            <div className={styles["features-list__wrap"]} dir={dir}>
                {leftFeatures.map(title => (
                    <div className={styles["feature"]} key={title}>
                        {iconName && <Icon name={iconName} size={18} className={styles["feature__icon"]} />}
                        <span className={styles["feature__title"]}>{title}</span>
                    </div>
                ))}
            </div>

            <div className={styles["features-list__wrap"]} dir={dir}>
                {rightFeatures.map(title => (
                    <div className={styles["feature"]} key={title}>
                        {iconName && <Icon name={iconName} size={18} className={styles["feature__icon"]} />}
                        <span className={styles["feature__title"]}>{title}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default memo(FeaturesList);
