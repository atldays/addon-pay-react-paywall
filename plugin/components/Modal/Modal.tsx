import React, {forwardRef, memo, useCallback, useImperativeHandle, useState} from "react";
import classnames from "classnames";

import {Icon, Modal as ModalComponent, ModalProps} from "addon-ui";

import styles from "./modal.scss";

export interface ModalActions {
    open(): void;

    close(): void;

    isOpen(): boolean;
}

export {type ModalProps};

const Modal = forwardRef<ModalActions, ModalProps>((props, ref) => {
    const {
        onClose,
        className,
        childrenClassName,
        ...other
    } = props;

    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
        close: () => setOpen(false),
        isOpen: () => open,
    }), [open]);

    const close = useCallback(() => {
        onClose?.();
        setOpen(false);
    }, [onClose]);

    return (
        <ModalComponent
            open={open}
            fullscreen={true}
            onClose={close}
            closeButton={{
                children: <Icon name="close"/>,
                className: styles['modal__close-button']
            }}
            className={classnames(styles['modal'], className)}
            childrenClassName={classnames(styles['modal__children'], childrenClassName)}
            {...other}
        />
    );
});

export default memo(Modal);
