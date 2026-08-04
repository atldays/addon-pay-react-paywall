import React, {memo} from "react";
import classnames from "classnames";

import {useLocale} from "adnbn/locale/react";

import {Button, ButtonProps} from "addon-ui";

import styles from "./restore-button.scss";

const RestoreButton = (props: ButtonProps) => {
    const {className, ...other} = props;

    const {t} = useLocale();

    return (
        <Button
            className={classnames(styles['restore-button'], className)}
            {...other}
        >
            {t("addon_pay.restore")}
        </Button>
    );
};

export default memo(RestoreButton);