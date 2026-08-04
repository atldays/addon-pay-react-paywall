import {lazy} from "react";

const TrialStartModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./TrialStartModal"));

export type {TrialStartModalProps} from "./TrialStartModal";

export default TrialStartModal;
