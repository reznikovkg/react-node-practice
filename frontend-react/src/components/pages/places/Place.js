import React, { Component } from 'react';

import axios from 'axios';
import ApiList from './../../../ApiList';

import  { connect } from 'react-redux';

import {
    Table,
    Button,
    Icon,
    Modal, Form, Checkbox, TextArea
} from 'semantic-ui-react';
import Reviews from "../../other/Reviews";


const mapStateToProps = state => ({
    ...state
});

class Place extends Component{
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            place: null
        };

        this.getPlace();
    }

    getPlace = () => {
        axios.get(`${ApiList.places_getPlace}`, {
            params: {
                id: this.state.id
            }
        }).then((response) => {
            this.setState({place: response.data.place })
        });
    };

    viewPlace = () => {
        if (this.state.place) {
            return (
                <div>
                    <p>Название: <b>{ this.state.place.name }</b></p>
                    <p>Описание: <b>{ this.state.place.description }</b></p>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <h3>Просмотр места</h3>
                {
                    this.viewPlace()
                }
                {/*{*/}
                {/*    <Reviews reviews={ this.state.place }></Reviews>*/}
                {/*}*/}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Place);
