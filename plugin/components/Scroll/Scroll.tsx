import React, {memo} from "react";
import classnames from "classnames";

import {ScrollArea, ScrollAreaProps} from "addon-ui";

import {ComponentMargin} from "../../types";

import styles from "./scroll.scss";

export interface ScrollProps extends ScrollAreaProps, ComponentMargin {

}

const Scroll = (props: ScrollProps) => {
    const {
        top,
        bottom,
        style,
        className,
        viewportClassName,
        children,
        ...other
    } = props;

    return (
        <ScrollArea
            className={classnames(styles["scroll"], className)}
            viewportClassName={classnames(styles["scroll__viewport"], viewportClassName)}
            style={{marginTop: top, marginBottom: bottom, ...style}}
            {...other}
        >
            {children}
        </ScrollArea>
    );
};

export default memo(Scroll);
