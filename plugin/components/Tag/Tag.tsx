import React, {memo} from "react";

import classnames from "classnames";

import {Tag as TagComponent, TagProps} from "addon-ui";

import styles from "./tag.scss";

const Tag = (props: TagProps) => {
    const {className, children, ...other} = props;

    return (
        <TagComponent className={classnames(styles["tag"], className)} {...other}>
            {children}
        </TagComponent>
    );
};

export default memo(Tag);
