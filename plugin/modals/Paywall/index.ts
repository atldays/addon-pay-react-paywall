import {lazy} from "react";

const PaywallModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./PaywallModal"));

export type {PaywallModalProps} from "./PaywallModal";

export default PaywallModal;
