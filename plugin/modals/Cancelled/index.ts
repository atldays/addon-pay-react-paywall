import {lazy} from "react";

const CancelledModal = lazy(() => import(/* webpackChunkName: "subscriptions" */ "./CancelledModal"));

export type {BeforeCancelModalProps} from "./CancelledModal";

export default CancelledModal;
