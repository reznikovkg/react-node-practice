import React, { Component } from 'react';

import axios from 'axios';
import ApiList from './../../../ApiList';

import  { connect } from 'react-redux';

import Reviews from "./include/Reviews";

import {
    Segment
} from "semantic-ui-react";

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
                id: this.state.id,
                token: this.props.userReducer.userToken
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

    viewReviews = () => {
        if (this.state.place) {
            return (
                <Reviews placeId={this.props.match.params.id} reviews={ this.state.place.reviews }/>
            );
        }
    };

    render() {
        return (
            <div>
                <h3>Просмотр места</h3>
                <Segment>
                {
                    this.viewPlace()
                }
                </Segment>
                {
                    this.viewReviews()
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(Place);
