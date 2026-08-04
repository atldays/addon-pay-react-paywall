import React, {memo} from "react";

import classnames from "classnames";

import {Button, ButtonProps} from "addon-ui";

import styles from "./action-button.scss";

export enum ActionButtonType {
    Primary = 'primary',
    Secondary = 'secondary'
}

export interface ActionButtonProps extends Omit<ButtonProps, 'type'> {
    type?: ActionButtonType;
    fullWidth?: boolean;
}

const ActionButton = (props: ActionButtonProps) => {
    const {
        type = ActionButtonType.Primary,
        fullWidth = true,
        className,
        children,
        ...other
    } = props;

    return (
        <Button
            className={classnames(styles['action-button'], {
                [styles[`action-button--${type}`]]: type,
                [styles['action-button--full-width']]: fullWidth
            }, className)}
            {...other}
        >
            {children}
        </Button>
    );
};

export default memo(ActionButton);
