import Chart from 'chart.js';
import React, { Component } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
import { CommonReportUtil } from '../../../helpers/CommonReportUtil';
import DataNotFound from './DataNotFound';
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
        this.init = this.init.bind(this);
        this.resolveResponse = this.resolveResponse.bind(this);
    }

    componentDidMount() {
        if(new CommonReportUtil().validateReportParams(this.props.reportParameters)){
            this.init(this.props.reportParameters);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(new CommonReportUtil().validateReportParams(nextProps.reportParameters)){
            this.init(nextProps.reportParameters);
        }
    }


    init(params) {
        new ApiHelper().post(ReportConstants.REPORT_REQUEST + this.props.reportUUID, params)
            .then((response) => {
                this.resolveResponse(response);
            });
    }


    resolveResponse(data) {
        this.setState({ report: data });
        this.setState({ reportColumnNames: data.dataSets[0].metadata.columns });
        this.setState({ reportRowData: data.dataSets[0].rows });
        this.getChartData(data);
    }

    getChartData(report) {
        var result = {};
        console.log(report);

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

        if( !this.refs.groupByDateChart ) return;
        var ctx = this.refs.groupByDateChart;
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(result),
                datasets: [{
                    label: this.state.report.definition.name,
                    data: Object.values(result),
                    borderWidth: 1,
                    backgroundColor: '#1cad8a',
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
            <div style={{ 'border-top': '1px solid', overflow: 'hidden' }}>

                {this.state.reportRowData.length != 'undefined' && this.state.reportRowData.length > 0 ? (

                    <canvas ref="groupByDateChart" width="100%" height="30%" ></canvas>
                ) : (
                        <DataNotFound componentName="Chart" />
                    )}

            </div>
        );
    }

}

export default GroupByDateChart;