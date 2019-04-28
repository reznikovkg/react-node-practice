import React, { Component } from 'react';

import { Link } from "react-router-dom";

import {
    Segment,
    Grid,
    Header,
    Button
} from 'semantic-ui-react';

import RouterList from "../../../RouterList";

class Activate extends Component {

    render() {
        return (
            <div>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Segment color='green'>
                            <Header>Учетная запись активирована</Header>

                            <Link to={RouterList.login.path}>
                                <Button type='submit' color='green'>Войти</Button>
                            </Link>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Activate;
