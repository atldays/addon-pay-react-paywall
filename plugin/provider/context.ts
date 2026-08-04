import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";

import {addDays, addMonths, addYears} from 'date-fns';

import {SubscriptionStorage} from "./Storage";

import {SubscriptionPlan, SubscriptionStatus} from "../types";
import {SubscriptionContextContract, SubscriptionStorageContract} from "./types";

const subscriptionStorage = new SubscriptionStorage();

export const SubscriptionContext = createContext<SubscriptionContextContract>({
    isSubscribed: false,
    checkAndOpenPaywall: () => false,
    openPaywall: () => null,
    action: () => null,
    update: () => null,
    changeStatus: () => null,
    resetPaidOptions: () => Promise.resolve(),
});

SubscriptionContext.displayName = "SubscriptionContext";

export const useAddonPay = () => useContext(SubscriptionContext);

export const useSubscriptionStorage = () => {
    const [loading, setLoading] = useState(true);
    const [storage, setStorage] = useState<SubscriptionStorageContract | undefined>(undefined);

    const requestId = useRef(0);

    const isSubscribed = useMemo(() => {
        return !!storage?.status && storage.status !== SubscriptionStatus.Free;
    }, [storage, loading]);

    const changeStatus = useCallback((status: SubscriptionStatus, plan?: SubscriptionPlan) => {
        let value: SubscriptionStorageContract = {status};

        const startAt = Date.now();

        if (status === SubscriptionStatus.Free) {
            value.renewAfterEnd = false;
        }

        if (status === SubscriptionStatus.Pro && plan) {
            const date = plan === SubscriptionPlan.Monthly
                ? addMonths(startAt, 1)
                : addYears(startAt, 1);

            value[SubscriptionStatus.Pro] = {plan, startAt, endAt: date.getTime()};
            value.renewAfterEnd = true;
        }

        if (status === SubscriptionStatus.Gift) {
            value[SubscriptionStatus.Gift] = {startAt, endAt: addDays(startAt, 1).getTime()};
        }

        if (status === SubscriptionStatus.TrialPreview) {
            value[SubscriptionStatus.TrialPreview] = {startAt, endAt: addDays(startAt, 1).getTime()};
        }

        if (status === SubscriptionStatus.Trial) {
            const currentStartAt = storage?.trialPreview?.startAt || startAt;

            value[SubscriptionStatus.Trial] = {
                startAt: currentStartAt,
                endAt: addDays(currentStartAt, 7).getTime()
            };
        }

        subscriptionStorage
            .update(value)
            .catch((e) => console.error("Failed to update subscription data", e));
    }, [storage]);

    const update = useCallback((value: Partial<SubscriptionStorageContract>) => {
        subscriptionStorage
            .update(value)
            .catch((e) => console.error("Failed to update subscription data", e));
    }, []);

    useEffect(() => {
        let canceled = false;

        const update = async () => {
            const id = ++requestId.current;

            try {
                const value = await subscriptionStorage.get();

                if (!canceled && id === requestId.current) {
                    setStorage(value);
                }
            } catch (e) {
                console.error("Failed to fetch subscription data", e);
            } finally {
                if (!canceled && id === requestId.current) {
                    setLoading(false);
                }
            }
        };

        const unsubscribe = subscriptionStorage.watch(update);

        update().catch(console.error);

        return () => {
            canceled = true;
            unsubscribe();
        };
    }, []);

    return {
        ...storage,
        isSubscribed,
        loading,
        changeStatus,
        update,
    };
};