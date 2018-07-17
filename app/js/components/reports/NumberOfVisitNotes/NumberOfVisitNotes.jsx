import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';
import DateRangeInput from '../common/DateRangeInput';
import moment from 'moment';
import LocationInput from '../common/LocationInput';
import InfoMessage from '../common/InfoMessage';
import ReportAsPieChart from '../common/ReportAsPieChart';
import NumberOfVisitNotesInputBox from './NumberOfVisitNotesInputBox';

/**
 * Display the result of Number of Visit Notes report
 */
class NumberOfVisitNotes extends Component {

  constructor() {
    super();
    let dateStart = moment().subtract(1, 'months').format('YYYY-MM-DD');
    let dateEnd = moment().add(1,'days').format('YYYY-MM-DD');
    this.state = {
      parameters: {
        startDate: dateStart,
        endDate: dateEnd,
        location: '',
        activeVisits: false
      }
    };
    this.getReportUUID = this.getReportUUID.bind(this);
    this.eventListenerForStartDate = this.eventListenerForStartDate.bind(this);
    this.eventListenerForEndDate = this.eventListenerForEndDate.bind(this);
    this.handleLocationSelector = this.handleLocationSelector.bind(this);
    this.eventListenerForParameter = this.eventListenerForParameter.bind(this);
  }

  getReportUUID() {
    return "9667ac52-4881-11e7-a919-92ebcb67fe33";
  }

  eventListenerForStartDate(selectedDate) {

    if (moment(selectedDate).isValid()) {
      this.setState(prevState => ({
        parameters: {
          startDate: moment(selectedDate).format('YYYY-MM-DD'),
          endDate: prevState.parameters.endDate,
          location: prevState.parameters.location,
          activeVisits: prevState.parameters.activeVisits
        }
      }));
    }
  }

  eventListenerForEndDate(selectedDate) {

    if (moment(selectedDate).isValid() && selectedDate.isAfter(this.state.parameters.startDate)) {
      this.setState(prevState => ({
        parameters: {
          startDate: prevState.parameters.startDate,
          // Set next day as the end date to select the visits upto today end.
          endDate: moment(selectedDate).add(1,'days').format('YYYY-MM-DD'),
          location: prevState.parameters.location,
          activeVisits: prevState.parameters.activeVisits
        }
      }));
    }
  }

  handleLocationSelector(event) {
    this.setState({
      parameters: {
        location: event.target.value,
        startDate: this.state.parameters.startDate,
        endDate: this.state.parameters.endDate,
        activeVisits: this.state.parameters.activeVisits
      }
    });
  }

  eventListenerForParameter(e) {
    this.setState(prevState => ({
      parameters: {
        startDate: prevState.parameters.startDate,
        endDate: prevState.parameters.endDate,
        location: prevState.parameters.location,
        activeVisits: !prevState.parameters.activeVisits
      }
    }));
}

  render() {
    return (
      <div>
        <ReportTitle heading="Number of Visit Notes" />

        <DateRangeInput label="Visit notes created"
          stdlistener={this.eventListenerForStartDate}
          etdlistener={this.eventListenerForEndDate}
          initStD={this.state.parameters.startDate}
          initEtD={this.state.parameters.endDate} />
        <NumberOfVisitNotesInputBox listener={this.eventListenerForParameter} />

        <LocationInput locationListener={this.handleLocationSelector}/>
        {this.state.parameters.location != null && this.state.parameters.location != '' ? (
          <div>
            <ReportAsTableView reportUUID={this.getReportUUID()}
              reportParameters={this.state.parameters} />
            <ReportAsPieChart reportUUID={this.getReportUUID()}
                reportParameters={this.state.parameters}
                labels="VisitType" qty="Count" limit={10} />
          </div>
        ) : (
          <InfoMessage componentName="location" />
        )}
      </div>
    );
  }

}

export default NumberOfVisitNotes;