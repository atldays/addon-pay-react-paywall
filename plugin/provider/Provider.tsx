import React, {PropsWithChildren, Suspense, useCallback, useEffect, useMemo, useRef, useState} from "react";

import {isSameDay} from "date-fns";

import confetti from "canvas-confetti";

import {SubscriptionStorage} from "./Storage";

import {
    BillingFailedModal,
    BillingGraceModal,
    CancelledModal,
    FeaturesModal,
    GiftEndModal,
    GiftModal,
    PaywallModal,
    TrialEndModal,
    TrialModal,
    TrialStartModal,
} from "../modals";
import {ModalActions} from "../components";
import {getDiffDays} from "../utils";
import {useCurrentTime} from "../hooks";
import {SubscriptionContext, useSubscriptionStorage} from "./context";

import {PaywallModalType, SubscriptionStatus} from "../types";

export interface ProviderProps extends PropsWithChildren {
    resetPaidOptions: () => Promise<void>;
    modalClassName?: string;
}

const Provider = (props: ProviderProps) => {
    const {resetPaidOptions, modalClassName, children} = props;

    const [paywallModalType, setPaywallModalType] = useState<string>(PaywallModalType.Default);

    const {
        status,
        gift,
        trialPreview,
        trial,
        pro,
        isSubscribed,
        lastShowModalAt,
        changeStatus,
        renewAfterEnd,
        ...other
    } = useSubscriptionStorage();

    const {currentTime} = useCurrentTime();

    const featuresModal = useRef<ModalActions | null>(null);
    const paywallModal = useRef<ModalActions | null>(null);

    const giftModal = useRef<ModalActions | null>(null);
    const giftEndModal = useRef<ModalActions | null>(null);

    const trialStartModal = useRef<ModalActions | null>(null);
    const trialModal = useRef<ModalActions | null>(null);
    const trialEndModal = useRef<ModalActions | null>(null);

    const cancelledModal = useRef<ModalActions | null>(null);

    const billingGraceModal = useRef<ModalActions | null>(null);
    const billingFailedModal = useRef<ModalActions | null>(null);

    const subscriptionStorageRef = useRef<SubscriptionStorage | null>(null);
    subscriptionStorageRef.current = subscriptionStorageRef.current || new SubscriptionStorage();

    const giftDiffDays = useMemo(() => {
        if (gift) return getDiffDays(gift.endAt, currentTime);
    }, [gift, currentTime]);

    const trialPreviewDiffDays = useMemo(() => {
        if (trialPreview) return getDiffDays(trialPreview.endAt, currentTime);
    }, [trialPreview, currentTime]);

    const trialDiffDays = useMemo(() => {
        if (trial) return getDiffDays(trial.endAt, currentTime);
    }, [trial, currentTime]);

    const proDiffDays = useMemo(() => {
        if (pro) return getDiffDays(pro.endAt, currentTime);
    }, [pro, currentTime]);

    const openPaywall = useCallback((type?: string) => {
        setPaywallModalType(type || PaywallModalType.Default);
        paywallModal.current?.open();
    }, []);

    const checkAndOpenPaywall = useCallback(
        (type?: string) => {
            setPaywallModalType(type || PaywallModalType.Default);

            if (!isSubscribed) {
                paywallModal.current?.open();
            }

            return !isSubscribed;
        },
        [isSubscribed]
    );

    // Only open the necessary modals based on the subscription status and remaining days
    const action = useCallback(() => {
        if (status === SubscriptionStatus.Free) {
            if (giftDiffDays === 0) {
                giftEndModal.current?.open();
                return;
            }

            if (trialPreviewDiffDays === 0) {
                trialEndModal.current?.open();
                return;
            }

            if (trialDiffDays === 0) {
                trialEndModal.current?.open();
                return;
            }

            if (proDiffDays === -7) {
                billingFailedModal.current?.open();
                return;
            }
        }

        if (status === SubscriptionStatus.Gift) {
            if (giftDiffDays !== undefined && giftDiffDays > 0) {
                giftModal.current?.open();
            }
        }

        if (status === SubscriptionStatus.TrialPreview) {
            if (trialPreviewDiffDays !== undefined && trialPreviewDiffDays > -7) {
                trialModal.current?.open();
            }
        }

        if (status === SubscriptionStatus.Trial) {
            if (trialDiffDays !== undefined && trialDiffDays > 0) {
                trialModal.current?.open();
            }
        }

        if (status === SubscriptionStatus.Pro) {
            if (proDiffDays !== undefined) {
                if (proDiffDays > 0) {
                    if (renewAfterEnd) {
                        featuresModal.current?.open();
                    } else {
                        cancelledModal.current?.open();
                    }
                }

                if (proDiffDays <= 0 && proDiffDays > -7) {
                    billingGraceModal.current?.open();
                    subscriptionStorageRef.current?.update({lastShowModalAt: {billingGrace: currentTime}});
                }

                if (proDiffDays <= -7) {
                    billingFailedModal.current?.open();
                }
            }
        }

        if (!status || status === SubscriptionStatus.Free) {
            openPaywall(PaywallModalType.Default);
            return;
        }
    }, [
        currentTime,
        status,
        giftDiffDays,
        trialPreviewDiffDays,
        trialDiffDays,
        proDiffDays,
        renewAfterEnd,
        openPaywall,
    ]);

    const isHasOpenedModal = () => {
        return !!(
            featuresModal.current?.isOpen() ||
            paywallModal.current?.isOpen() ||
            giftModal.current?.isOpen() ||
            trialModal.current?.isOpen() ||
            trialEndModal.current?.isOpen() ||
            billingGraceModal.current?.isOpen() ||
            billingFailedModal.current?.isOpen()
        );
    };

    useEffect(() => {
        if (other.email && lastShowModalAt?.trialStart === undefined) {
            setTimeout(() => {
                changeStatus(SubscriptionStatus.Trial);

                trialStartModal.current?.open();
                other.update({lastShowModalAt: {trialStart: currentTime}});
                confetti({
                    particleCount: 100,
                    spread: 90,
                    origin: {x: 0.5, y: 0.2},
                    zIndex: 999999999,
                });
            }, 2000);
        }
    }, [other.email]);

    // Only resetting status to Free if the GIFT, TRIAL PREVIEW or TRIAL has expired
    useEffect(() => {
        // GIFT has expired
        if (status === SubscriptionStatus.Gift && giftDiffDays !== undefined && giftDiffDays <= 0) {
            changeStatus(SubscriptionStatus.Free);
            resetPaidOptions().catch(console.error);
        }

        // TRIAL PREVIEW has expired
        if (
            status === SubscriptionStatus.TrialPreview &&
            trialPreviewDiffDays !== undefined &&
            trialPreviewDiffDays <= 0
        ) {
            changeStatus(SubscriptionStatus.Free);
            resetPaidOptions().catch(console.error);
        }

        // TRIAL has expired
        if (status === SubscriptionStatus.Trial && trialDiffDays !== undefined && trialDiffDays <= 0) {
            changeStatus(SubscriptionStatus.Free);
            resetPaidOptions().catch(console.error);
        }

        // PRO has expired
        if (status === SubscriptionStatus.Pro && proDiffDays !== undefined && proDiffDays <= -7) {
            changeStatus(SubscriptionStatus.Free);
            other.update({renewAfterEnd: false});
            resetPaidOptions().catch(console.error);
        }
    }, [currentTime]);

    useEffect(() => {
        if (proDiffDays === undefined) return;
        if (proDiffDays > 0) return;

        const {billingGrace, billingFailed} = lastShowModalAt || {};

        // Billing grace period Modal
        if (proDiffDays > -7 && (!billingGrace || !isSameDay(billingGrace, currentTime))) {
            if (isHasOpenedModal()) return;
            other.update({lastShowModalAt: {billingGrace: currentTime}});
            setTimeout(() => billingGraceModal.current?.open(), 2000);
        }

        // Billing failed Modal - only once
        if (proDiffDays <= -7 && !billingFailed) {
            if (isHasOpenedModal()) return;
            other.update({lastShowModalAt: {billingFailed: currentTime}});
            setTimeout(() => billingFailedModal.current?.open(), 2000);
        }
    }, [currentTime]);

    const contextValue = useMemo(
        () => ({
            action,
            openPaywall,
            checkAndOpenPaywall,
            resetPaidOptions,

            status,
            gift,
            trialPreview,
            trial,
            pro,
            isSubscribed,
            lastShowModalAt,
            changeStatus,
            renewAfterEnd,
            ...other,
        }),
        [
            action,
            openPaywall,
            checkAndOpenPaywall,
            resetPaidOptions,
            status,
            gift,
            trialPreview,
            trial,
            pro,
            isSubscribed,
            lastShowModalAt,
            changeStatus,
            renewAfterEnd,
        ]
    );

    return (
        <SubscriptionContext.Provider value={contextValue}>
            {children}
            <Suspense>
                <PaywallModal ref={paywallModal} type={paywallModalType} className={modalClassName} />
            </Suspense>

            <Suspense>
                <FeaturesModal ref={featuresModal} className={modalClassName} />
            </Suspense>

            <Suspense>
                <GiftModal ref={giftModal} className={modalClassName} />
            </Suspense>

            <Suspense>
                <GiftEndModal ref={giftEndModal} className={modalClassName} />
            </Suspense>

            <Suspense>
                <TrialStartModal ref={trialStartModal} className={modalClassName} />
            </Suspense>

            <Suspense>
                <TrialModal ref={trialModal} className={modalClassName} />
            </Suspense>

            <Suspense>
                <TrialEndModal ref={trialEndModal} className={modalClassName} />
            </Suspense>

            <Suspense>
                <CancelledModal ref={cancelledModal} className={modalClassName} />
            </Suspense>

            <Suspense>
                <BillingGraceModal ref={billingGraceModal} className={modalClassName} />
            </Suspense>

            <Suspense>
                <BillingFailedModal ref={billingFailedModal} className={modalClassName} />
            </Suspense>
        </SubscriptionContext.Provider>
    );
};

Provider.displayName = "AddonPayPaywallProvider";

export default Provider;
