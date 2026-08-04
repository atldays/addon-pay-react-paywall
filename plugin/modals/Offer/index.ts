import {lazy} from "react";

const OfferModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./OfferModal"));

export type {OfferModalProps} from "./OfferModal";

export default OfferModal;
