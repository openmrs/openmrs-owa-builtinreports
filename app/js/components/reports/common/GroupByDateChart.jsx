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
      reportRowData: Array(),
      result: {}
    };
    this.init = this.init.bind(this);
    this.resolveResponse = this.resolveResponse.bind(this);
    this.getDateColumnName = this.getDateColumnName.bind(this);
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

    let ctx = this.refs.groupByDateChart;

    if (ctx != null && ctx != 'undefined') {

      let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.state.result),
          datasets: [{
            label: this.state.report.definition.name,
            data: Object.values(this.state.result),
            borderWidth: 1,
            backgroundColor: '#1cad8a',
            pointRadius: 10,
            pointHoverRadius: 14,
            lineTension: 0,
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
    let result = {};

    if (report.uuid != 'undefined') {

      let dataRows = report.dataSets[0].rows;
      let columnWithDate = this.getDateColumnName(dataRows[0]);

      dataRows.forEach((e) => {

        let formattedDateTime = this.groupBySelection(e[columnWithDate]);

        if (result[formattedDateTime] == null || result[formattedDateTime] == 'undefined') {
          result[formattedDateTime] = 1;
        } else {
          result[formattedDateTime] = result[formattedDateTime] + 1;
        }
      });
    }
    this.setState({ result: result });

  }

  getDateColumnName(object) {
    let columnName = null;
    Object.keys(object).forEach(function (key) {
      if (moment(object[key], moment.ISO_8601, true).isValid()) {
        columnName = key;
      }
    });
    return columnName;
  }

  groupBySelection(dateTime) {

    if (this.props.groupBy != 'undefined' && this.props.groupBy != null) {
      let passedValue = this.props.groupBy;

      if (passedValue.toUpperCase() == 'YEAR') {
        return moment(dateTime, moment.ISO_8601, true).format('YYYY');
      } else if (passedValue.toUpperCase() == 'MONTH') {
        return moment(dateTime, moment.ISO_8601, true).format('MMM-YYYY');
      } else if (passedValue.toUpperCase() == 'DAY') {
        return moment(dateTime, moment.ISO_8601, true).format('DD-MMM-YYYY');
      } else if (passedValue.toUpperCase() == 'WEEK') {
        return moment(dateTime, moment.ISO_8601, true).format('YYYY WW');
      } else if (passedValue.toUpperCase() == 'HOUR') {
        return moment(dateTime, moment.ISO_8601, true).format('DD-MM-YYYY HH');
      }
    }
  }

  render() {
    return (
      <div style={{ 'borderTop': '1px solid', overflow: 'hidden' }}>

        {this.state.reportRowData.length != 'undefined' && this.state.reportRowData.length > 0 ? (

          <canvas ref="groupByDateChart" width="100%" height="30%"/>
        ) : (
          <DataNotFound componentName="Chart" />
        )}

      </div>
    );
  }

}

GroupByDateChart.propTypes = {
  reportParameters: PropTypes.object.isRequired,
  fetchData: PropTypes.object.isRequired,
  reportUUID: PropTypes.string.isRequired,
  groupBy: PropTypes.string.isRequired
};

export default GroupByDateChart;