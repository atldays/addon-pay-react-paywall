import {lazy} from "react";

const TrialModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./TrialModal"));

export type {TrialModalProps} from "./TrialModal";

export default TrialModal;
