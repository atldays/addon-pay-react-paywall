import {lazy} from "react";

const NoInternetModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./NoInternetModal"));

export type {NoInternetModalProps} from "./NoInternetModal";

export default NoInternetModal;
