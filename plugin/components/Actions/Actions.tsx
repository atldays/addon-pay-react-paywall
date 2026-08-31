import React, {ComponentProps, memo} from "react";

import classnames from "classnames";

import {ActionButton, ActionButtonType} from "../../components";

import {ComponentMargin} from "../../types";

import styles from "./actions.scss";

export interface ActionsProps extends ComponentProps<"section">, ComponentMargin {
    primaryLabel: string;
    secondaryLabel?: string;
    secondaryNote?: string;
    description?: string;
    primaryClassName?: string;
    secondaryClassName?: string;
    onPrimaryClick: () => void;
    onSecondaryClick?: () => void;
}

const Actions = (props: ActionsProps) => {
    const {
        primaryLabel,
        secondaryLabel,
        secondaryNote,
        description,
        top,
        bottom,
        style,
        onPrimaryClick,
        onSecondaryClick,
        className,
        primaryClassName,
        secondaryClassName,
        ...other
    } = props;

    return (
        <section
            className={classnames(styles["actions"], className)}
            style={{marginTop: top, marginBottom: bottom, ...style}}
            {...other}
        >
            {description && <span className={styles["actions__description"]}>{description}</span>}

            <div className={styles["actions__wrap"]}>
                {secondaryLabel && (
                    <ActionButton
                        className={secondaryClassName}
                        type={ActionButtonType.Secondary}
                        onClick={onSecondaryClick}
                        title={secondaryLabel}
                    >
                        {secondaryLabel}
                        {secondaryNote && <div className={styles["action__note"]}>{secondaryNote}</div>}
                    </ActionButton>
                )}

                <ActionButton
                    className={primaryClassName}
                    type={ActionButtonType.Primary}
                    onClick={onPrimaryClick}
                    fullWidth={!!secondaryLabel}
                    title={primaryLabel}
                >
                    {primaryLabel}
                </ActionButton>
            </div>
        </section>
    );
};

export default memo(Actions);
