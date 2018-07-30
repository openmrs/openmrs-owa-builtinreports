import React, { Component, PropTypes } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
import { CommonReportUtil } from '../../../helpers/CommonReportUtil';
import ReactDataGrid from 'react-data-grid';
import DataNotFound from './DataNotFound';
import moment from 'moment';
import './ReportAsTableView.css';
import { Router, Route, hashHistory, BrowserRouter, withRouter } from 'react-router-dom'
import ReportAsTableViewHeader from './ReportAsTableViewHeader';

/**
 * Display results of a report as a table
 */
class ReportAsTableView extends Component {

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
    };
    this.countSum = 0;
    this.resolveResponse = this.resolveResponse.bind(this);
    this.rowGetter = this.rowGetter.bind(this);
    this.init = this.init.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.getCellActions = this.getCellActions.bind(this);
    this.getRedirectParameters = this.getRedirectParameters.bind(this);
    this.setSumOfColumn = this.setSumOfColumn.bind(this);
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

  getVisibleColumns(dataColumns) {
    let reportColumns = dataColumns;
    let hiddenColumns = this.props.hiddenColumns;
    if(hiddenColumns) {
      reportColumns.map(function(column) {
        var index = hiddenColumns.indexOf(column.name)
        if(index>=0) {
          column.hidden = true;
        }
        else {
          column.hidden = false;
        }
     });
     reportColumns = reportColumns.filter(item => item.hidden !== true)
    }
    return reportColumns;
  }
  
  setSumOfColumn(columnName) {
    this.state.reportRowData.forEach((e) => {
      this.countSum += e[columnName];
      this.forceUpdate();
    });
  }

  resolveResponse(data) {
    this.setState({ report: data });
    this.setState({ reportColumnNames: this.getVisibleColumns(data.dataSets[0].metadata.columns) });
    this.setState({ reportRowData: data.dataSets[0].rows });
    if(this.props.addSumOfCount) {
      this.setSumOfColumn(this.props.addSumOfCount.countColumnName);
    }
  }

  getColumns() { 
    let columns = this.state.reportColumnNames.map(function (element) {

      let displayName = element.label;
      if (displayName.indexOf('_') > -1) {
        displayName = displayName.replace(/_/g, ' ');
      }
      return { key: element.name, name: displayName, resizable: true };
    });
    return columns;
  }

  rowGetter(i) {
    let row = this.state.reportRowData[i];

    //format a date value if found any in the table
    Object.keys(row).forEach(function (key, index) {
      if (row[key] != null && row[key] != 'undefined' && isNaN(row[key]) && moment(row[key], moment.ISO_8601, true).isValid()) {
        row[key] = moment(row[key], moment.ISO_8601, true).format("YYYY-MM-DD HH:mm:ss");
      }
      if (row[key] == null) {
        row[key] = "";
      }
    });
    return row;
  }

  getRedirectParameters(row) {
    let redirectParameters = this.props.redirectParameters;
    let response = {}
    redirectParameters.map(function(parameter) {
      response[parameter.toLowerCase()] = row[parameter];
    });
    response.startDate = this.props.reportParameters.startDate;
    response.endDate = this.props.reportParameters.endDate;
    return response;
  }

  onRowClick(rowIdx, row) {
    if(this.props.reportTableClickable) {
      let redirectAddress =  this.props.clickBasePath + row[this.props.redirectUrlKeyColumn];
      if(!this.props.randomRedirectURL) {
        this.props.history.push({
          pathname: redirectAddress,
          state: this.getRedirectParameters(row)
        });
      }
      else {
        window.location.assign(redirectAddress);
      }
    }
  };

  getCellActions(column, row) {
    if(this.props.reportTableClickable) {
      if (column.key === 'Count') {
        return [
          {
            icon: 'glyphicon glyphicon-menu-right'
          }
        ];
      }
    }
  }

  render() {
    return (
      <div className="TableDivHolder">

        {this.getColumns().length > 0 ? (
          <div>
          <ReactDataGrid
            columns={this.getColumns()}
            rowGetter={this.rowGetter}
            rowsCount={this.state.reportRowData.length}
            minHeight={280}
            onRowClick={this.onRowClick}
            getCellActions={this.getCellActions} />
            { this.props.addSumOfCount != null &&
              <ReportAsTableViewHeader
              totalCountLabel = {this.props.addSumOfCount.totalCountLabel}
              totalCount={this.countSum} 
              />
            }
           </div>
        ) : (
          <DataNotFound componentName="Report Table" />
        )}

      </div>
    );
  }

}

ReportAsTableView.propTypes = {
  reportParameters: PropTypes.object.isRequired,
  fetchData: PropTypes.object.isRequired,
  reportUUID: PropTypes.string.isRequired
};

export default withRouter(ReportAsTableView);