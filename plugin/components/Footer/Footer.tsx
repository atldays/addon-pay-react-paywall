import React, {ComponentProps, memo} from "react";
import classnames from "classnames";

import {ComponentMargin} from "../../types";

import styles from "./footer.scss";

interface FooterProps extends ComponentProps<'footer'>, ComponentMargin {

}

const Footer = (props: FooterProps) => {
    const {
        top,
        bottom,
        style,
        className,
        children,
        ...other
    } = props;

    return (
        <footer
            className={classnames(styles['footer'], className)}
            style={{marginTop: top, marginBottom: bottom, ...style}}
            {...other}
        >
            {children}
        </footer>
    );
};

export default memo(Footer);
