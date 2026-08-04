import {lazy} from "react";

const FeaturesModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./FeaturesModal"));

export type {FeaturesModalProps} from "./FeaturesModal";

export default FeaturesModal;
