import {lazy} from "react";

const TrialEndModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./TrialEndModal"));

export type {TrialEndModalProps} from "./TrialEndModal";

export default TrialEndModal;
