import React, {ComponentProps, memo} from "react";
import classnames from "classnames";

import {Icon} from "addon-ui";

import {useLocale} from "adnbn/locale/react";

import {getAddonPayPaywallOptions} from "../../api";

import {ComponentMargin} from "../../types";

import styles from "./title.scss";

interface TitleProps extends ComponentProps<'div'>, ComponentMargin {
    text: string,
    showPro?: boolean,
}

const Title = (props: TitleProps) => {
    const {
        text,
        showPro,
        top,
        bottom,
        width,
        style,
        className,
        ...other
    } = props;

    const {t} = useLocale();

    const {icons} = getAddonPayPaywallOptions()

    if (text.trim().length === 0) return;

    return (
        <div
            className={classnames(styles['title'], className)}
            style={{marginTop: top, marginBottom: bottom, width, ...style}}
            {...other}
        >
            <h1 className={styles['title__text']}>
                {text}
            </h1>
            {showPro &&
                <div className={styles['title__after']}>
                    {icons?.beforeBadge && <Icon name={icons.beforeBadge} size={14}/>}
                    <span>{t("addon_pay.paid")}</span>
                </div>
            }
        </div>
    );
};

export default memo(Title);
