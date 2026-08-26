import React, {ComponentProps, memo} from "react";

import classnames from "classnames";

import {Icon} from "addon-ui";

import {getAddonPayPaywallOptions} from "../../api";

import styles from "./badge.scss";

interface DescriptionProps extends ComponentProps<'span'> {
    text: string;
    height?: number;
}

const Badge = (props: DescriptionProps) => {
    const {text, height, className, style, ...other} = props;

    const {icons} = getAddonPayPaywallOptions();

    return (
        <span
            className={classnames(styles['badge'], className)}
            style={{...style, height}}
            {...other}
        >
            {icons?.beforeBadge &&
                <Icon
                    className={styles['badge__icon']}
                    name={icons.beforeBadge}
                    size={14}
                />
            }
            <span>{text}</span>
        </span>
    );
};

export default memo(Badge);
