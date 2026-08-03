import React, {FC, memo} from "react";
import classnames from "classnames";

import {Button, ButtonProps, ButtonVariant, Icon} from "addon-ui";

import {getAddonPayPaywallOptions} from "../../api";

import styles from "./link-button.scss";

export interface LinkButtonProps extends ButtonProps {
    underline?: boolean;
    asText?: boolean;
    showIcon?: boolean;
}

const LinkButton: FC<LinkButtonProps> = (props) => {
    const {
        underline = true,
        showIcon,
        asText,
        className,
        ...other
    } = props;

    const {icons} = getAddonPayPaywallOptions();

    return (
        <Button
            className={classnames(styles['link-button'], {
                [styles['link-button--underline']]: underline,
                [styles['link-button--as-text']]: asText,
            }, className)}
            before={showIcon && icons?.beforeLink && <Icon name={icons.beforeLink} size={14}/>}
            variant={ButtonVariant.Text}
            {...other}
        />
    );
};

export default memo(LinkButton);
