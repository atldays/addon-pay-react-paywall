import {lazy} from "react";

const BillingGraceModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./BillingGraceModal"));

export type {BillingFailedModalProps} from "./BillingGraceModal";

export default BillingGraceModal;
