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
      parameters: {}
    };
    this.getReportUUID = this.getReportUUID.bind(this);
    this.getReportUUIDForAllLocationsReport = this.getReportUUIDForAllLocationsReport.bind(this);
    this.getCountColumnInfo = this.getCountColumnInfo.bind(this);
  }

  getReportUUID() {
    return "d39509bc-4881-11e7-a919-92ebcb67fe33";
  }

  getReportUUIDForAllLocationsReport() {
    return "923b9664-84c3-4988-a888-458c42405605";
  }

  getCountColumnInfo() {
    return { "countColumnName" : "Count", "totalCountLabel" : "Total Count of the Admissions"}
  }

  render() {
    return (
      <div>
        <ReportTitle heading="Number of Admissions" />
        
        <ReportAsTableView reportUUID={this.getReportUUIDForAllLocationsReport()}
          reportParameters={this.state.parameters}
          addSumOfCount={this.getCountColumnInfo()} />
            
        <ReportAsPieChart reportUUID={this.getReportUUIDForAllLocationsReport()}
          reportParameters={this.state.parameters}
          labels="Location Name" qty="Count" limit={10} />
      </div>
    );
  }

}

export default NumberOfAdmissions;