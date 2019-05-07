import React, { Component } from 'react';

import axios from 'axios';
import ApiList from './../../../ApiList';

import  { connect } from 'react-redux';

import Reviews from "./include/Reviews";

import {
    Segment
} from "semantic-ui-react";

import conf from "../../../const/conf";
import Chart from "./include/Chart";

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
        })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    viewPlace = () => {
        if (this.state.place) {
            return (
                <div>
                    <p>Изображение: <img src={ `${ conf.domainServer }${this.state.place.picture}` } alt=""/></p>
                    <p>Название: <b>{ this.state.place.name }</b></p>
                    <p>Описание: <b>{ this.state.place.description }</b></p>
                    <p>Контактный Email: <b>{ this.state.place.contactEmail }</b></p>
                    <p>Контактный телефон: <b>{ this.state.place.contactPhone }</b></p>
                    <p>Рабочее время: <b>{ this.state.place.workingTimeStart } - { this.state.place.workingTimeFinish }</b></p>
                </div>
            );
        }
    };

    viewReviews = () => {
        if (this.state.place) {
            return (
                <Reviews placeId={this.props.match.params.id} reviews={ this.state.place.reviews } updateReviews={ this.getPlace }/>
            );
        }
    };

    viewChart = () => {
        if (this.state.place) {
            return (
                <Chart placeId={this.props.match.params.id} />
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
                {
                    this.viewChart()
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(Place);
