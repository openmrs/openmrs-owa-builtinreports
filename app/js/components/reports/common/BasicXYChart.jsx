import Line from 'react-chartjs';
import React, { Component } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
import { CommonReportUtil } from '../../../helpers/CommonReportUtil';
import DataNotFound from './DataNotFound';
import moment from 'moment';

/**
 * Display results of a report as a chart
 */
class BasicXYChart extends Component {

    constructor(props) {
        super();
        this.state = {
            report: {
                definition: {
                    name: ''
                }
            },
            reportColumnNames: Array(),
            reportRowData: Array(),
            result: {}
        };
        this.init = this.init.bind(this);
        this.resolveResponse = this.resolveResponse.bind(this);
    }

    componentDidMount() {
        if (new CommonReportUtil().validateReportParams(this.props.reportParameters)) {
            this.init(this.props.reportParameters);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (new CommonReportUtil().validateReportParams(nextProps.reportParameters)) {
            this.init(nextProps.reportParameters);
        }
    }


    init(params) {

        if (this.props.fetchData != null) {
            //Test Path
            this.resolveResponse(this.props.fetchData.body);
        } else {
            new ApiHelper().post(ReportConstants.REPORT_REQUEST + this.props.reportUUID, params)
                .then((response) => {
                    this.resolveResponse(response);
                });
        }
    }

    resolveResponse(data) {

        this.setState({
            report: data,
            reportColumnNames: data.dataSets[0].metadata.columns,
            reportRowData: data.dataSets[0].rows
        });
        this.getChartData(data);
    }

    getChartData(report) {
        var result = {};
        var y_type = 'number';

        if (report.uuid != 'undefined') {


            var dataRows = report.dataSets[0].rows;
            dataRows.forEach((e) => {

                if (e[this.props.X_label] != null && e[this.props.X_label] != 'undefined'
                    && e[this.props.Y_label] != null && e[this.props.Y_label] != 'undefined') {

                    if (isNaN(e[this.props.X_label]) && moment(e[this.props.X_label], moment.ISO_8601, true).isValid()) {
                        e[this.props.X_label] = moment(e[this.props.X_label], moment.ISO_8601, true).format("YYYY-MM-DD HH:mm:ss");
                    }
                    if (isNaN(e[this.props.Y_label]) && moment(e[this.props.Y_label]).isValid()) {
                        e[this.props.Y_label] = moment(e[this.props.Y_label], moment.ISO_8601, true).format("YYYY-MM-DD HH:mm:ss");
                        y_type = 'category';
                    }

                    result[e[this.props.X_label]] = e[this.props.Y_label];
                }

            });
        }
        this.setState({ result: result,
                        y_type: y_type });

    }


    render() {
        return (
            <div style={{ 'borderTop': '1px solid', overflow: 'hidden' }}>
                
                {this.state.reportRowData.length != 'undefined' && this.state.reportRowData.length > 0 ? (

                    <canvas ref="basicXYChart" width="100%" height="30%" ></canvas>

                ) : (
                        <DataNotFound componentName="Chart" />
                    )}

            </div>
        );
    }

    componentDidUpdate() {

        var ctx = this.refs.basicXYChart;

        if (ctx != null && ctx != 'undefined') {
            var config = {
                type: 'line',
                data: {
                    xLabels: Object.keys(this.state.result).slice(0, this.props.limit),
                    yLabels: Object.values(this.state.result).slice(0, this.props.limit),
                    datasets: [{
                        label: this.state.report.definition.name,
                        data: Object.values(this.state.result).slice(0, this.props.limit),
                        backgroundColor: 'rgba(154, 208, 245, 0.5)',
                        borderWidth: 1,
                        pointStyle: 'circle',
                        pointBackgroundColor: 'rgb(77, 172, 237)',
                        pointRadius: 5,
                        pointHoverRadius: 10,
                        borderWidth: 1,
                        borderColor: '#000000'

                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            position: 'left',
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: this.props.Y_label
                            },
                            ticks: {
                                beginAtZero: true,
                                min: 0
                            }
                        }]
                    }
                }
            };

            if (this.state.y_type == 'category') {
                config.options.scales.yAxes[0]['type'] = 'category';
            } else {
                config.options.scales.yAxes[0]['beginAtZero'] = 'true';
            }
            var myChart = new Chart(ctx, config);
        }

    }


}

export default BasicXYChart;