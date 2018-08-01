import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';
import GroupByDateChart from '../common/GroupByDateChart';
import InputBox from '../ListOfUsers/ListOfUsersInputBox';
import { CommonReportUtil } from '../../../helpers/CommonReportUtil';

/**
 * Display the result of List of providers report
 */
class ListOfProviders extends Component {

  constructor() {
    super();
    this.state = {
      parameters: {
        retired: false
      }
    };

    this.getReportUUID = this.getReportUUID.bind(this);
    this.eventListenerForParameter = this.eventListenerForParameter.bind(this);
  }

  getReportUUID() {
    return "d3950ea8-4881-11e7-a919-92ebcb67fe34";
  }

  eventListenerForParameter(e) {
    this.setState(prevState => ({

      parameters: {
        retired: !prevState.parameters.retired
      }
    }));
  }

  render() {

    return (
      <div>
        <ReportTitle heading="List of Providers" />

        <InputBox listener={this.eventListenerForParameter} />

        <ReportAsTableView reportUUID={this.getReportUUID()}
          reportParameters={this.state.parameters}
          reportTableClickable={true} 
          clickBasePath={"ListOfPatientsForProvider/"} 
          hiddenColumns={["ProviderUuid"]} 
          redirectUrlKeyColumn={["ProviderUuid"]} 
          redirectParameters={["ProviderUuid","FamilyName","GivenName","RoleName","Created"]}  />

        <GroupByDateChart reportUUID={this.getReportUUID()}
          reportParameters={this.state.parameters} groupBy="month" />
      </div>
    );
  }

}

export default ListOfProviders;