import Chart from 'chart.js';
import React, { Component, PropTypes } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
import { CommonReportUtil } from '../../../helpers/CommonReportUtil';
import DataNotFound from './DataNotFound';
import moment from 'moment';

/**
 * Display results of a report as a chart
 */
class ReportAsPieChart extends Component {

  constructor() {
    super();
    this.state = {
      report: {
        definition: {
          name: ''
        },
        dataSets: null
      },
      result: {}
    };
    this.init = this.init.bind(this);
    this.resolveResponse = this.resolveResponse.bind(this);
    this.getColors = this.getColors.bind(this);
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
  componentDidUpdate() {

    let ctx = this.refs.pieChart;

    if (ctx != null && ctx != 'undefined') {


      let optionsPie = {
        legend: {
          position: 'right'
        },
        tooltipEvents: [],
        showTooltips: true,
        onAnimationComplete: function () {
          this.showTooltip(this.segments, true);
        },
        tooltipTemplate: "<%= label %> - <%= value %>"
      };

      let data = {
        datasets: [{
          data: Object.values(this.state.result).slice(0, this.props.limit),
          backgroundColor: this.getColors(this.props.limit)
        }],
        labels: Object.keys(this.state.result).slice(0, this.props.limit)
      };

      let myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: optionsPie
      });
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
      report: data
    });
    this.getChartData(data);
  }

  getChartData(report) {
    let result = {};

    if (report.uuid != 'undefined') {

      let dataRows = report.dataSets[0].rows;
      dataRows.forEach((e) => {

        if (e[this.props.labels] != null && e[this.props.labels] != 'undefined'
          && e[this.props.qty] != null && e[this.props.qty] != 'undefined') {

          result[e[this.props.labels]] = e[this.props.qty];
        }

      });
    }
    this.setState({ result: result });

  }

  getColors(dataSize) {
    let colorBank = ['#e15768', '#e18857', '#e157ad', '#ce57e1', '#8957e1', '#5768e1',
      '#57ade1', '#57e188', '#68e157', '#ade157', '#e1ce57'];
    let result = Array();

    for (let i = 0, j = 0; i < dataSize; i++ , j++) {
      if (i % colorBank.length == 0) {
        j = 0;
      }
      result.push(colorBank[j]);
    }

    return result;
  }

  render() {

    return (
      <div style={{ 'borderTop': '1px solid', overflow: 'hidden' }}>

        {this.state.report.dataSets != null && this.state.report.dataSets != 'undefined'
          && this.state.report.dataSets[0].rows.length > 0 ? (

            <canvas ref="pieChart" width="100%" height="33%" />
          ) : (
            <DataNotFound componentName="Chart" />
          )}

      </div>
    );
  }

}

ReportAsPieChart.propTypes = {
  reportParameters: PropTypes.object.isRequired,
  fetchData: PropTypes.object.isRequired,
  labels: PropTypes.string.isRequired,
  qty: PropTypes.string.isRequired,
  reportUUID: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired
};

export default ReportAsPieChart;