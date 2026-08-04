import React, {ComponentProps, memo} from "react";

import classnames from "classnames";

import {ComponentMargin} from "../../types";

import styles from "./subtitle.scss";

interface SubtitleProps extends ComponentProps<'div'>, ComponentMargin {
    text: string;
}

const Subtitle = (props: SubtitleProps) => {
    const {
        text,
        top,
        bottom,
        width,
        style,
        className,
        ...other
    } = props;

    if (text.trim().length === 0) return;

    return (
        <div
            className={classnames(styles['subtitle'], className)}
            style={{marginTop: top, marginBottom: bottom, width, ...style}}
            {...other}
        >
            {text}
        </div>
    );
};

export default memo(Subtitle);
