import {lazy} from "react";

const GiftModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./GiftEndModal"));

export type {GiftEndModalProps} from "./GiftEndModal";

export default GiftModal;
