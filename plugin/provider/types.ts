import {SubscriptionPlan, SubscriptionStatus} from "../types";

export interface SubscriptionStorageContract {
    status?: SubscriptionStatus,
    email?: string,
    hasDiscount?: boolean,
    renewAfterEnd?: boolean,
    [SubscriptionStatus.Gift]?: {
        startAt: number,
        endAt: number,
    }
    [SubscriptionStatus.TrialPreview]?: {
        startAt: number,
        endAt: number,
    },
    [SubscriptionStatus.Trial]?: {
        startAt: number,
        endAt: number,
    },
    [SubscriptionStatus.Pro]?: {
        plan: SubscriptionPlan,
        startAt: number,
        endAt: number,
    },
    lastShowModalAt?: {
        trialStart?: number,
        billingGrace?: number,
        billingFailed?: number,
    }
}

export interface SubscriptionContextContract extends SubscriptionStorageContract {
    isSubscribed: boolean;
    action: () => void;
    openPaywall: (type?: string) => void;
    checkAndOpenPaywall: (type?: string) => boolean;
    changeStatus: (status: SubscriptionStatus, plan?: SubscriptionPlan) => void;
    update: (value: Partial<SubscriptionStorageContract>) => void;
    resetPaidOptions: () => Promise<void>;
}
