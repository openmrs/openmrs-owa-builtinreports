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
      parameters: {}
    };
    this.getReportUUID = this.getReportUUID.bind(this);
    this.getReportUUIDForAllLocationsReport = this.getReportUUIDForAllLocationsReport.bind(this);
    this.getCountColumnInfo = this.getCountColumnInfo.bind(this);
  }

  getReportUUID() {
    return "b39c5070-4881-11e7-a919-92ebcb67fe33";
  }

  getReportUUIDForAllLocationsReport() {
    return "d1a00e10-cecb-4775-8c4f-2ed0b059d7b9";
  }

  getCountColumnInfo() {
    return { "countColumnName" : "Count", "totalCountLabel" : "Total Count of the Discharges"}
  }

  render() {
    return (
      <div>
        <ReportTitle heading="Number of Discharges" />
          <div>
          <ReportAsTableView reportUUID={this.getReportUUIDForAllLocationsReport()}
            reportParameters={this.state.parameters}
            addSumOfCount={this.getCountColumnInfo()} />
            
            <ReportAsPieChart reportUUID={this.getReportUUIDForAllLocationsReport()}
            reportParameters={this.state.parameters}
            labels="Location Name" qty="Count" limit={10} />
          </div>
      </div>
    );
  }

}

export default NumberOfDischarges;