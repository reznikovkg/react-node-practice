import { createStore } from "redux";

import mainReducer from './reducers';
import initialState from './initialState';

const configureStore = (state = initialState, reducer = mainReducer) => {
    return createStore(reducer, state);
};

export default configureStore;
