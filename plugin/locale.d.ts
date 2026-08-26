import {
    Language,
    LocaleDir,
    type LocaleNonPluralKeys,
    type LocalePluralKeys,
    type LocaleSubstitutionArgs,
} from "adnbn/locale";

declare module "adnbn/locale" {

    export interface GeneratedNativeStructure {
        "addon_pay.ext_name": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.picker_badge": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.cost_in_week": {
            "plural": false,
            "substitutions": [
                "value"
            ]
        },
        "addon_pay.monthly": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.my_features": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.not_now": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.paid": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.restore": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.save_percentage": {
            "plural": false,
            "substitutions": [
                "value"
            ]
        },
        "addon_pay.yearly": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.days": {
            "plural": true,
            "substitutions": []
        },
        "addon_pay.days_with_count": {
            "plural": true,
            "substitutions": [
                "count"
            ]
        },
        "addon_pay.date_until.1": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.2": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.3": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.4": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.5": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.6": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.7": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.8": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.9": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.10": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.11": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.date_until.12": {
            "plural": false,
            "substitutions": [
                "day",
                "year"
            ]
        },
        "addon_pay.links.privacy_policy": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.links.terms_of_use": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.links.manage_billing": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.links.change_plan": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.links.cancel": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.notes.trusted_by_users": {
            "plural": false,
            "substitutions": [
                "count"
            ]
        },
        "addon_pay.notes.no_credit_card_required": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.notes.no_risk_cancel_anytime": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.notes.your_gift_ends_automatically": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.notes.your_trial_ends_automatically": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.tags.gift_remaining": {
            "plural": false,
            "substitutions": [
                "value"
            ]
        },
        "addon_pay.tags.trial_remaining": {
            "plural": false,
            "substitutions": [
                "value"
            ]
        },
        "addon_pay.tags.trial_has_ended": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.tags.monthly_plan_renews": {
            "plural": false,
            "substitutions": [
                "date"
            ]
        },
        "addon_pay.tags.monthly_plan_access_until": {
            "plural": false,
            "substitutions": [
                "date"
            ]
        },
        "addon_pay.tags.yearly_plan_renews": {
            "plural": false,
            "substitutions": [
                "date",
                "value"
            ]
        },
        "addon_pay.tags.yearly_plan_access_until": {
            "plural": false,
            "substitutions": [
                "date",
                "value"
            ]
        },
        "addon_pay.tags.payment_needs_attention": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.paywall.default.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.paywall.default.subtitle": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.paywall.default.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.paywall.default.secondary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.paywall.default.secondary_action_note": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.paywall.default.secondary_action_after_trial_preview": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.paywall.default.description": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.paywall.default.description_after_trial_preview": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.paywall.default.description_after_trial": {
            "plural": false,
            "substitutions": [
                "name"
            ]
        },
        "addon_pay.modals.gift_start.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.gift_start.subtitle": {
            "plural": false,
            "substitutions": [
                "days",
                "name"
            ]
        },
        "addon_pay.modals.gift_start.tag": {
            "plural": false,
            "substitutions": [
                "value"
            ]
        },
        "addon_pay.modals.gift_start.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.gift.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.gift.subtitle": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.gift.tag": {
            "plural": false,
            "substitutions": [
                "value"
            ]
        },
        "addon_pay.modals.gift.description": {
            "plural": false,
            "substitutions": [
                "name"
            ]
        },
        "addon_pay.modals.gift.primary_action": {
            "plural": false,
            "substitutions": [
                "value"
            ]
        },
        "addon_pay.modals.gift_end.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.gift_end.subtitle": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.gift_end.description": {
            "plural": false,
            "substitutions": [
                "name"
            ]
        },
        "addon_pay.modals.gift_end.tag": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.gift_end.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.gift_end.secondary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.gift_end.secondary_action_note": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_activating.title_1": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_activating.title_2": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_activating.title_3": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_activating.subtitle": {
            "plural": false,
            "substitutions": [
                "name"
            ]
        },
        "addon_pay.modals.trial_activating.no_internet": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_activating.failed_subtitle": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_activating.failed_primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_start.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_start.subtitle": {
            "plural": false,
            "substitutions": [
                "date",
                "name"
            ]
        },
        "addon_pay.modals.trial_start.tag": {
            "plural": false,
            "substitutions": [
                "value"
            ]
        },
        "addon_pay.modals.trial_start.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial.subtitle": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial.tag": {
            "plural": false,
            "substitutions": [
                "value"
            ]
        },
        "addon_pay.modals.trial.description": {
            "plural": false,
            "substitutions": [
                "name"
            ]
        },
        "addon_pay.modals.trial.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_end.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_end.tag": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_end.description": {
            "plural": false,
            "substitutions": [
                "name"
            ]
        },
        "addon_pay.modals.trial_end.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_preview.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_preview.subtitle": {
            "plural": false,
            "substitutions": [
                "count",
                "days"
            ]
        },
        "addon_pay.modals.trial_preview.description": {
            "plural": false,
            "substitutions": [
                "name"
            ]
        },
        "addon_pay.modals.trial_preview.tag": {
            "plural": false,
            "substitutions": [
                "value"
            ]
        },
        "addon_pay.modals.trial_preview.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_preview.secondary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_preview.secondary_action_note": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_preview_end.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_preview_end.subtitle": {
            "plural": false,
            "substitutions": [
                "count",
                "days"
            ]
        },
        "addon_pay.modals.trial_preview_end.description": {
            "plural": false,
            "substitutions": [
                "name"
            ]
        },
        "addon_pay.modals.trial_preview_end.tag": {
            "plural": false,
            "substitutions": [
                "count",
                "days"
            ]
        },
        "addon_pay.modals.trial_preview_end.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_preview_end.secondary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.trial_preview_end.secondary_action_note": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.features.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.before_cancel.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.before_cancel.subtitle": {
            "plural": false,
            "substitutions": [
                "date"
            ]
        },
        "addon_pay.modals.before_cancel.lose_discount": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.before_cancel.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.before_cancel.primary_action_loading": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.before_cancel.secondary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.offer.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.offer.subtitle": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.offer.description": {
            "plural": false,
            "substitutions": [
                "name"
            ]
        },
        "addon_pay.modals.offer.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.offer.secondary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.cancelled.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.cancelled.subtitle": {
            "plural": false,
            "substitutions": [
                "date"
            ]
        },
        "addon_pay.modals.cancelled.subtitle_2": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.cancelled.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.billing_grace.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.billing_grace.subtitle": {
            "plural": false,
            "substitutions": [
                "date"
            ]
        },
        "addon_pay.modals.billing_grace.tag": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.billing_grace.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.billing_grace.secondary_action": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.billing_failed.title": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.billing_failed.subtitle": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.billing_failed.tag": {
            "plural": false,
            "substitutions": []
        },
        "addon_pay.modals.billing_failed.primary_action": {
            "plural": false,
            "substitutions": []
        },
        "locale": {
            "plural": false,
            "substitutions": []
        }
    }

}

declare module "adnbn/locale/react" {
    import type {GeneratedNativeStructure} from "adnbn/locale";

    export interface LocaleContract {
        lang: Language;

        dir: LocaleDir;

        isRtl: boolean;

        t<K extends LocaleNonPluralKeys<GeneratedNativeStructure>>(
            key: K,
            ...args: LocaleSubstitutionArgs<GeneratedNativeStructure, K>
        ): string;

        choice<K extends LocalePluralKeys<GeneratedNativeStructure>>(
            key: K,
            count: number,
            ...args: LocaleSubstitutionArgs<GeneratedNativeStructure, K>
        ): string;

        change(lang: Language): void;
    }

    export function useLocale(): LocaleContract;
}
