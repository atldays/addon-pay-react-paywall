import {ForwardedRef, useCallback, useMemo, useRef} from "react";

import {useStorage} from "@addon-core/storage/react";

export const useForwardedRef = <T>(forwardedRef: ForwardedRef<T>) => {
    const localRef = useRef<T>(null);

    const setRef = useCallback((instance: T | null) => {
        localRef.current = instance;

        if (typeof forwardedRef === "function") {
            forwardedRef(instance);
        } else if (forwardedRef) {
            forwardedRef.current = instance;
        }
    }, [forwardedRef]);

    return [localRef, setRef] as const;
};

export const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useStorage('currentTime');

    return useMemo(() => {
        return {
            currentTime: currentTime || Date.now(),
            setCurrentTime,
            resetCurrentTime: () => setCurrentTime(Date.now()),
        };
    }, [currentTime, setCurrentTime]);
};