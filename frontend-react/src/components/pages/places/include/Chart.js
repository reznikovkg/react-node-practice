import React, { Component } from 'react';

import  { connect } from 'react-redux';

import {
    Button,
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
            dateFinish: `${ ("0" + (dateNow.getDate())).slice(-2) }-${ ("0" + (dateNow.getMonth()+1)).slice(-2) }-${ dateNow.getFullYear() }`,

            means: {
                day: 0,
                week: 0,
                month: 0,
                year: 0
            },

            labels: [],
            dataChart: []
        };

        this.getReviews();
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
                this.setState({labels: response.data.reviewsToChart.date, dataChart:response.data.reviewsToChart.rating, means: response.data.means, }, this.plotChart );
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    plotChart = () => {
        let ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.state.labels,
                datasets: [{
                    label: 'Изменение оценки (ср.)',
                    data: this.state.dataChart,
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
                        <p>Среднеее за последний день: { this.state.means.day }</p>
                        <p>Среднеее за последнюю неделю: { this.state.means.week }</p>
                        <p>Среднеее за последний месяц: { this.state.means.month }</p>
                        <p>Среднеее за последний год: { this.state.means.year }</p>
                    </div>

                    <canvas id="myChart" width="400" height="200"></canvas>
                </Segment>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ChartReact);
