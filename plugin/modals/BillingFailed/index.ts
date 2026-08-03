import {lazy} from "react";

const BillingFailedModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./BillingFailedModal"));

export type {BillingFailedModalProps} from "./BillingFailedModal";

export default BillingFailedModal;
