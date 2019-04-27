import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import axios from "axios";

import Cookies from 'js-cookie';

import configureStore from "./store/store";

import 'semantic-ui-css/semantic.min.css';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom";

import ApiList from "./ApiList";

const store = configureStore();

let startState = store.getState();

/**
 * Get user by token
 * @param token
 */
function getUserData(token) {
    if (!token) {
        store.dispatch({type:'SET_USER_DATA', payload: {}});
        return;
    }

    axios.get(`${ApiList.auth_connect}`, {
        params: {
            token: token
        }
    })
        .then((response) => {
            console.log('connect ok');
            store.dispatch({type:'SET_USER_DATA', payload: response.data});
        })
        .catch((error) => {
            console.log('connect error');
            store.dispatch({type:'SET_USER_DATA', payload: {}});
            store.dispatch({type:'SET_USER_TOKEN', payload: null});
            Cookies.set('user_token','', { expires: -1 })

        })
}

/**
 * Listener for user token
 */
function checkChangeUserToken() {
    const nowState = store.getState();

    console.log(startState.userReducer.userToken, nowState.userReducer.userToken);
    if (startState.userReducer.userToken !== nowState.userReducer.userToken) {
        startState = store.getState();
        getUserData(nowState.userReducer.userToken)
    }
}

/**
 * Include listener for user token
 */
store.subscribe(checkChangeUserToken);

/**
 * Initial get user
 */
if (startState.userReducer.userToken) {
    getUserData(startState.userReducer.userToken);
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
