import React, { Component } from 'react';

import  { connect } from 'react-redux';

import {
    Segment
} from "semantic-ui-react";

import Chart  from 'chart.js';

const mapStateToProps = state => ({
    ...state
});

class ChartReact extends Component {
    constructor(props) {
        super(props);


    }

    getReviews = () => {
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
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

    render() {
        return (
            <div>
                <h3>Графики</h3>
                <Segment>
                    <canvas id="myChart" width="400" height="200"></canvas>
                </Segment>
                <button onClick={ this.getReviews }>go</button>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ChartReact);
