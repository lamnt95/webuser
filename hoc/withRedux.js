import { createWrapper } from "next-redux-wrapper";
import storeRedux from "../redux";

const wrapperNextWithStore = createWrapper(storeRedux.createStore, { debug: true });

export default wrapperNextWithStore;
