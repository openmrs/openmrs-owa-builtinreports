import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';
import LocationInput from '../common/LocationInput';
import ReportAsPieChart from '../common/ReportAsPieChart';

/**
 * Display the result of Number of Discharges report
 */
class NumberOfDischarges extends Component {

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
    return "b39c5070-4881-11e7-a919-92ebcb67fe33";
  }

  getReportUUIDForAllLocationsReport() {
    return "d1a00e10-cecb-4775-8c4f-2ed0b059d7b9";
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
        <ReportTitle heading="Number of Discharges" />
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

export default NumberOfDischarges;