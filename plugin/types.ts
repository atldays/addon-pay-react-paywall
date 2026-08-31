export interface AddonPayPaywallOptions {
    featuresCount: number;
    shortFeaturesCount: number;
    trustedRating?: number;
    trustedUserCount?: string;
    icons?: {
        successFeature?: string;
        errorFeature?: string;
        rating?: string;
        beforeLink?: string;
        beforeBadge?: string
    };
}

export interface ComponentMargin {
    top?: number,
    bottom?: number,
    width?: string,
}

export enum SubscriptionStatus {
    Free = 'free',
    Gift = 'gift',
    TrialPreview = 'trialPreview',
    Trial = 'trial',
    Pro = 'pro',
}

export enum SubscriptionPlan {
    Monthly = 'monthly',
    Yearly = 'yearly',
}

export enum PaywallModalType {
    Default = 'default',
}

export const PluginName = "@addon-lab/plugin-paywall";
