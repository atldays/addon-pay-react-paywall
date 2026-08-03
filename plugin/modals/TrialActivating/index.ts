import {lazy} from "react";

const TrialActivatingModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./TrialActivatingModal"));

export type {TrialActivatingModalProps} from "./TrialActivatingModal";

export default TrialActivatingModal;
