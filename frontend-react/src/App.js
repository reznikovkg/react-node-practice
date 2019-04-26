import React, {Component} from 'react';
import { Route } from "react-router-dom";
import './App.css';

import MainMenu from './components/main/MainMenu';
import RouterList from './RouterList';

import {
    Container
} from 'semantic-ui-react';

import  { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state
});

class App extends Component {
    render() {
        const viewRoute = (route) => {
            const routeToView = <Route exact path={ route.path } key={ route.path } component={ route.component }/>;
            const redirectToLogin = <Route exact path={ route.path } key={ route.path } component={ RouterList.login.component }/>;

            if (!route.access) {
                return routeToView;
            }

            if (!this.props.userReducer.userData) {
                return redirectToLogin;
            }

            if (route.access === 'all') {
                return routeToView;
            }

            if (this.props.userReducer.userData.type !== route.access) {
                return redirectToLogin;
            }

            return routeToView;
        };

        return (
            <div>
                <MainMenu/>
                <Container>
                    <Container style={ {marginTop: '80px'} }>
                        {
                            Object.values(RouterList).map( viewRoute )
                        }
                    </Container>
                </Container>
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
