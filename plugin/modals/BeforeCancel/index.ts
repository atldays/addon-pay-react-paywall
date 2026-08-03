import {lazy} from "react";

const BeforeCancelModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./BeforeCancelModal"));

export type {BeforeCancelModalProps} from "./BeforeCancelModal";

export default BeforeCancelModal;
