import React, {Component} from 'react';
import { Route} from "react-router-dom";
import './App.css';

import MainMenu from './components/main/MainMenu';
import RouterList from './RouterList';

import {
    Container
} from 'semantic-ui-react';


import  { connect } from 'react-redux';


import startAction from './actions/startAction';
import stopAction from './actions/stopAction';

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    startAction: () => dispatch(startAction),
    stopAction: () => dispatch(stopAction)
});

class App extends Component {
    render() {

        return (
            <div>
                <MainMenu/>

                <Container>
                    <Container style={ {marginTop: '150px'} }>
                        {
                            Object.values(RouterList).map( route => <Route exact path={route.path} key={route.path} component={route.component}/> )
                        }
                    </Container>
                </Container>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
