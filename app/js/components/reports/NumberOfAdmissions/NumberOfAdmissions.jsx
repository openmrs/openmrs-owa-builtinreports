import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';
import LocationInput from '../common/LocationInput';
import InfoMessage from '../common/InfoMessage';
import ReportAsPieChart from '../common/ReportAsPieChart';

/**
 * Display the result of Number of Admissions report
 */
class NumberOfAdmissions extends Component {

  constructor() {
    super();
    this.state = {
      parameters: {
        location: ''
      }
    };
    this.getReportUUID = this.getReportUUID.bind(this);
    this.getReportUUIDForAllLocationsReport = this.getReportUUIDForAllLocationsReport.bind(this);
    this.handleLocationSelector = this.handleLocationSelector.bind(this);
  }

  getReportUUID() {
    return "d39509bc-4881-11e7-a919-92ebcb67fe33";
  }

  getReportUUIDForAllLocationsReport() {
    return "8fd12cfb-b0d5-4991-8acf-b90aefe7f86c";
  }

  handleLocationSelector(event) {
    this.setState({
      parameters: {
        location: event.target.value
      }
    });
  }

  render() {
    return (
      <div>
        <ReportTitle heading="Number of Admissions" />
        <LocationInput locationListener={this.handleLocationSelector} />
        
        {this.state.parameters.location != null && this.state.parameters.location != '' ? (

          <ReportAsTableView reportUUID={this.getReportUUID()}
            reportParameters={this.state.parameters} />

        ) : (
          <div>
          <ReportAsTableView reportUUID={this.getReportUUIDForAllLocationsReport()}
            reportParameters={this.state.parameters} />
            
            <ReportAsPieChart reportUUID={this.getReportUUIDForAllLocationsReport()}
            reportParameters={this.state.parameters}
            labels="Location Name" qty="Count" limit={10} />
          </div>
        )}
      </div>
    );
  }

}

export default NumberOfAdmissions;