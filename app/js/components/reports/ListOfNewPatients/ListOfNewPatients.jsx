import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';
import GroupByDateChart from '../common/GroupByDateChart';
import InputBoxLOP from './InputBoxLOP';
import moment from 'moment';

/**
 * Display the result of List of New Patient Registrations report
 */
class ListOfNewPatients extends Component {

  constructor() {
    super();
    let date = moment().subtract(1, 'months').format('YYYY-MM-DD');
    this.state = {
      parameters: {
        startDate: date,
        chartViewType : "month"
      }
    };
    this.getReportUUID = this.getReportUUID.bind(this);
    this.eventListenerForParameter = this.eventListenerForParameter.bind(this);
    this.handlechartViewTypeSelector = this.handlechartViewTypeSelector.bind(this);
  }

  getReportUUID() {
    return "e451a9d6-4881-11e7-a919-92ebcb67fe33";
  }

  eventListenerForParameter(selectedDate) {
    if (moment(selectedDate).isValid()) {
      this.setState(prevState => ({
        parameters: {
          startDate: selectedDate,
          chartViewType: prevState.parameters.chartViewType
        }
      }));
    }
  }

  handlechartViewTypeSelector(event) {
    let xq = event.target.value;
    console.error(xq);
    this.setState(prevState=> ({
      parameters: {
        startDate: prevState.parameters.startDate,
        chartViewType: xq
      }
    }));
  }

  render() {
    return (
      <div>

        <ReportTitle heading="List of New Patient Registrations" />
        <InputBoxLOP listener={this.eventListenerForParameter} 
        initDateTime={this.state.parameters.startDate} 
        handlechartViewTypeSelector={this.handlechartViewTypeSelector}/>
        <ReportAsTableView reportUUID={this.getReportUUID()}
          reportParameters={this.state.parameters} />

        <GroupByDateChart reportUUID={this.getReportUUID()}
          reportParameters={this.state.parameters} groupBy={this.state.parameters.chartViewType} />
      </div>
    );
  }

}

export default ListOfNewPatients;