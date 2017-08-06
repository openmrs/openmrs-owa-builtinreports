import Chart from 'chart.js';
import React, { Component } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
import moment from 'moment';

/**
 * Display results of a report as a chart
 */
class GroupByDateChart extends Component {

    constructor(props) {
        super();
        this.state = {
            report: {
                definition: {
                    name: ''
                }
            },
            reportColumnNames: Array(),
            reportRowData: Array()
        };
        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
        this.resolveResponse = this.resolveResponse.bind(this);
    }

    getReportUUID() {
        return this.props.reportUUID;
    }

    getReportParameter() {
        return this.props.reportParameters;
    }

    resolveResponse(data) {
        this.setState({ report: data });
        this.setState({ reportColumnNames: data.dataSets[0].metadata.columns });
        this.setState({ reportRowData: data.dataSets[0].rows });
        this.getChartData(data);
    }


    componentDidMount() {

        new ApiHelper().post(ReportConstants.REPORT_REQUEST + this.getReportUUID(), this.getReportParameter())
            .then((response) => {
                this.resolveResponse(response);
            });
    }

    getChartData(report) {
        var result = {};

        if (report.uuid != 'undefined') {

            var dataRows = this.state.report.dataSets[0].rows;
            dataRows.forEach((e) => {

                var formattedDateTime = this.groupBySelection(e.date_created);

                if (result[formattedDateTime] == null || result[formattedDateTime] == 'undefined') {
                    result[formattedDateTime] = 1;
                } else {
                    result[formattedDateTime] = result[formattedDateTime] + 1;
                }
            });
        }

        var ctx = this.refs.groupByDateChart;
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(result),
                datasets: [{
                    label: this.state.report.definition.name,
                    data: Object.values(result),
                    backgroundColor: 'rgba(165, 223, 223, 0.5)',
                    borderWidth: 1,
                    pointBackgroundColor: 'rgb(77, 172, 237)',
                    pointRadius: 10,
                    pointHoverRadius: 14,
                    lineTension: 0,
                    borderWidth: 1,
                    borderColor: '#000000'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Count'
                        }
                    }]
                }
            }
        });
    }

    groupBySelection(dateTime) {

        if (this.props.groupBy != 'undefined' && this.props.groupBy != null) {
            var passedValue = this.props.groupBy;

            if (passedValue.toUpperCase() == 'YEAR') {
                return moment(dateTime).format('YYYY');
            } else if (passedValue.toUpperCase() == 'MONTH') {
                return moment(dateTime).format('MMM-YYYY');
            } else if (passedValue.toUpperCase() == 'DAY') {
                return moment(dateTime).format('DD-MMM-YYYY');
            } else if (passedValue.toUpperCase() == 'WEEK') {
                return moment(dateTime).format('YYYY WW');
            } else if (passedValue.toUpperCase() == 'HOUR') {
                return moment(dateTime).format('DD-MM-YYYY HH');
            }
        }
    }

    render() {
        return (
            <div>
                <canvas ref="groupByDateChart" width="100%" height="30%" style={{border: '1px solid black'}}></canvas>
            </div>
        );
    }

}

export default GroupByDateChart;