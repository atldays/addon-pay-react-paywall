import {lazy} from "react";

const GiftStartModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./GiftStartModal"));

export type {GiftStartModalProps} from "./GiftStartModal";

export default GiftStartModal;
