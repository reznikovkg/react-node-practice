import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import configureStore from "./store";

import 'semantic-ui-css/semantic.min.css';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
