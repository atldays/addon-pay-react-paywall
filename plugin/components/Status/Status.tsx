import React, {ComponentProps, memo} from "react";

import classnames from "classnames";

import {ComponentMargin} from "../../types";

import styles from "./status.scss";

export enum StatusType {
    Success = 'success',
    Error = 'error'
}

interface StatusProps extends ComponentProps<'div'>, ComponentMargin {
    text: string;
    type?: StatusType;
}

const Status = (props: StatusProps) => {
    const {
        text,
        type = StatusType.Success,
        top,
        bottom,
        style,
        className,
        ...other
    } = props;

    return (
        <div className={styles['status-wrapper']}>
            <div
                className={classnames(styles['status'], {
                    [styles[`status--${type}`]]: type
                }, className)}
                style={{marginTop: top, marginBottom: bottom, ...style}}
                {...other}
            >
                {text}
            </div>
        </div>
    );
};

export default memo(Status);
