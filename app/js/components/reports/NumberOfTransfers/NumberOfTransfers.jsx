import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';
import LocationInput from '../common/LocationInput'; 
import ReportAsPieChart from '../common/ReportAsPieChart';

/**
 * Display the result of Number of Transfers report
 */
class NumberOfTransfers extends Component {

  constructor() {
    super();
    this.state = {
      parameters: {}
    };
    this.getReportUUID = this.getReportUUID.bind(this); 
    this.getCountColumnInfo = this.getCountColumnInfo.bind(this);
  }

  getReportUUID() {
    return "b39c4c4c-4881-11e7-a919-92ebcb67fe33";
  }

  getReportUUIDForAllLocationsReport() {
    return "ad418753-8a1c-4f5f-8c61-5599369bd5d2";
  }

  getCountColumnInfo() {
    return { "countColumnName" : "Count", "totalCountLabel" : "Total Count of the Transfers"}
  }

  render() {
    return (
      <div>
        <ReportTitle heading="Number of Transfers" />
          <div>
          <ReportAsTableView reportUUID={this.getReportUUIDForAllLocationsReport()}
            reportParameters={this.state.parameters} />
            
            <ReportAsPieChart reportUUID={this.getReportUUIDForAllLocationsReport()}
            reportParameters={this.state.parameters}
            labels="Location Name" qty="Count" limit={10} />
          </div>
      </div>
    );
  }

}

export default NumberOfTransfers;