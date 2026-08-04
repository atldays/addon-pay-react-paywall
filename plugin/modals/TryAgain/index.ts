import {lazy} from "react";

const TryAgainModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./TryAgainModal"));

export type {TryAgainModalProps} from "./TryAgainModal";

export default TryAgainModal;
