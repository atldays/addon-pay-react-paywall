import {lazy} from "react";

const GiftModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./GiftModal"));

export type {GiftModalProps} from "./GiftModal";

export default GiftModal;
