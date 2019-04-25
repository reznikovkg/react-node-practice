import { createStore } from "redux";

import mainReducer from './reducers';
import initialState from './initialState';

const configureStore = (state = initialState, reducer = mainReducer) => {
    return createStore(reducer, state, window.__REDUX_DEVTOOLS_EXTENSION__());
};

export default configureStore;
