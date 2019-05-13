import React, { Component } from 'react';

import  { connect } from 'react-redux';

import {
    Button,
    Grid,
    Segment
} from "semantic-ui-react";

import Chart  from 'chart.js';
import { DateInput } from "semantic-ui-calendar-react";

import Style from "../../../../const/style";
import axios from "axios";
import ApiList from "../../../../ApiList";

const mapStateToProps = state => ({
    ...state
});

class ChartReact extends Component {
    constructor(props) {
        super(props);

        const dateNow = new Date();

        this.state = {
            reviews: [],

            dateStart: '01-01-1990',
            dateFinish: `${ dateNow.getDate() }-${ dateNow.getMonth()+1 }-${ dateNow.getFullYear() }`,

            means: {
                day: 0,
                week: 0,
                month: 0,
                year: 0
            }
        };
    }

    getReviews = () => {
        axios.get(`${ApiList.review_getReviews}`, {
            params: {
                placeId: this.props.placeId,
                token: this.props.userReducer.userToken,
                userId: this.props.userReducer.userData.id,

                dateStart: this.state.dateStart,
                dateFinish: this.state.dateFinish
            }
        })
            .then((response) => {
                this.setState({reviews: response.data.reviews, means: response.data.means}, this.plotChart );
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    plotChart = () => {
        let ctx = document.getElementById('myChart');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Изменение оценки',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(56,255,69,0.43)',
                    borderColor: 'rgb(0,129,21)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };

    handleChangeDateStart = (event, {name, value}) => {
        this.setState({ dateStart: value });
    };

    handleChangeDateFinish = (event, {name, value}) => {
        this.setState({ dateFinish: value });
    };

    render() {
        return (
            <div>
                <h3>Графики</h3>
                <Segment>
                    <div style={ Style.divFlex }>
                        <div>
                            <label>Начало</label>
                            <DateInput
                                name="date"
                                placeholder="Начальная дата"
                                value={ this.state.dateStart }
                                iconPosition="left"
                                onChange={ this.handleChangeDateStart }
                            />
                        </div>

                        <div>
                            <label>Конец</label>
                            <DateInput
                                name="date"
                                placeholder="Конечная дата"
                                value={ this.state.dateFinish }
                                iconPosition="left"
                                onChange={ this.handleChangeDateFinish }
                            />
                        </div>
                    </div>
                    <div>
                        <Button color='blue' compact onClick={ this.getReviews }>Построить</Button>
                    </div>

                    <div>
                        <p>Среднеее за день - { this.state.means.day }; за неделю - { this.state.means.week }; за месяц - { this.state.means.month }; за год - { this.state.means.year }.</p>
                    </div>

                    <canvas id="myChart" width="400" height="200"></canvas>
                </Segment>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ChartReact);
