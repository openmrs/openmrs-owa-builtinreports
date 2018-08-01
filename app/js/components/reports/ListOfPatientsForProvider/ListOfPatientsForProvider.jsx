import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportAsPieChart from '../common/ReportAsPieChart';
import ReportTitle from '../common/ReportTitle';
import HeaderForPatientsForProvider from './HeaderForPatientsForProvider';
import moment from 'moment';
import GroupByDateChart from '../common/GroupByDateChart';

/**
 * Display the result of List of Patients for a provider report
 */
class ListOfPatientsForProvider extends Component {

  constructor() {
    super();
    let dateStart = moment().subtract(1, 'months').format('YYYY-MM-DD');
    let dateEnd = moment().format('YYYY-MM-DD');
    this.state = {
      parameters: {
        startDate: dateStart,
        endDate: dateEnd
      }
    };
    this.getReportUUID = this.getReportUUID.bind(this);
    this.getReportParameters = this.getReportParameters.bind(this);
    this.bkBtnClick = this.bkBtnClick.bind(this);
  }

  getReportUUID() {
    return "e451ae04-4881-11e7-a919-92ebcb67fe45";
  }

  bkBtnClick() {
    let redirectAddress =  '../ListOfProviders';
    this.props.history.push(redirectAddress);
  }

  getReportParameters() {
    let reportParameters = this.props.location.state;
    if(reportParameters) {
      reportParameters.providerUuid = this.props.match.params.providerUuid;
      reportParameters.givenName = this.props.location.state.givenName;
      return reportParameters;
    }
    else {
      // if the states are not available then redirect to ListOfProvider report to skip the view failures.
      this.props.history.push({
        pathname: "../ListOfProvider"
      });
      location.reload();
    }
   
  }

  render() {
    return (
      <div>
        <ReportTitle heading="Patients worked with Provider" />
        <HeaderForPatientsForProvider
          reportParameters={this.getReportParameters()} 
          bkBtnClick={this.bkBtnClick}/>

        <ReportAsTableView reportUUID={this.getReportUUID()}
          reportParameters={this.getReportParameters()}
          hiddenColumns={["PersonId", "PersonUuid"]}
          reportTableClickable={true} 
          clickBasePath={"../../coreapps/clinicianfacing/patient.page?patientId="} 
          redirectUrlKeyColumn={["PersonUuid"]}
          redirectParameters={["PersonUuid"]} 
          randomRedirectURL={true}/>

        <GroupByDateChart reportUUID={this.getReportUUID()}
          reportParameters={this.getReportParameters()} groupBy="month" />
      </div>
    );
  }

}

export default ListOfPatientsForProvider;