import Chart from 'chart.js';
import React, { Component } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
import './ReportAsTableView.css';

/**
 * Display results of a report as a chart
 */
class ReportAsChart extends Component {


    componentDidUpdate() {

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.props.X_labels,
                datasets: [{
                    label: this.props.reportName,
                    data: this.props.Y_labels,
                    borderWidth: 1,
                    pointStyle: 'circle',
                    pointBackgroundColor: '#ff6384',
                    pointRadius: 10,
                    pointHoverRadius: 14,
                    lineTension: 0
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
    }

    render() {
        return (
            <div>
                <canvas id="myChart" width="100%" height="30%"></canvas>
            </div>
        );
    }

}

export default ReportAsChart;