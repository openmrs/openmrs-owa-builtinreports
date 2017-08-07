import Line from 'react-chartjs';
import React, { Component } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
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
            reportRowData: Array()
        };
        this.init = this.init.bind(this);
        this.resolveResponse = this.resolveResponse.bind(this);
    }

    componentDidMount() {
        this.init(this.props.reportParameters);
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps.reportParameters);
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
        var y_type = 'number';

        if (report.uuid != 'undefined') {

            var dataRows = this.state.report.dataSets[0].rows;
            dataRows.forEach((e) => {

                if (e[this.props.X_label] != null && e[this.props.X_label] != 'undefined'
                    && e[this.props.Y_label] != null && e[this.props.Y_label] != 'undefined') {

                    if (isNaN(e[this.props.X_label]) && moment(e[this.props.X_label]).isValid()) {
                        e[this.props.X_label] = moment(e[this.props.X_label]).format("YYYY-MM-DD HH:mm:ss");
                    }
                    if (isNaN(e[this.props.Y_label]) && moment(e[this.props.Y_label]).isValid()) {
                        e[this.props.Y_label] = moment(e[this.props.Y_label]).format("YYYY-MM-DD HH:mm:ss");
                        y_type = 'category';
                    }

                    result[e[this.props.X_label]] = e[this.props.Y_label];
                }

            });
        }

        var ctx = this.refs.basicXYChart;
        var config = {
            type: 'line',
            data: {
                xLabels: Object.keys(result),
                yLabels: Object.values(result),
                datasets: [{
                    label: this.state.report.definition.name,
                    data: Object.values(result),
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
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: this.props.X_label
                        }
                    }],
                    yAxes: [{
                        position: 'left',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: this.props.Y_label
                        }
                    }]
                }
            }
        };

        if (y_type == 'category') {
            config.options.scales.yAxes[0]['type'] = 'category';
        }
        var myChart = new Chart(ctx, config);
    }


    render() {
        return (
            <div>
                {this.state.report.uuid != 'undefined' && this.state.reportRowData.length > 0 ? (

                    <canvas ref="basicXYChart" width="100%" height="50%" style={{ border: '1px solid black' }}></canvas>
                ) : (
                        <DataNotFound componentName="Chart" />
                    )}

            </div>
        );
    }

}

export default BasicXYChart;