import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';

/**
 * Display the result of List of New Patient Registrations report
 */
class ListOfNewPatients extends Component {

    constructor() {
        super();

        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
    }

    getReportUUID() {
        return "e451a9d6-4881-11e7-a919-92ebcb67fe33";
    }

    getReportParameter() {
        return {
            "startDate": "2017-05-05"
        };
    }

   render() {
        return (
            <div>
                <ReportAsTableView reportName="List of New Patient Registrations" 
                                   reportUUID={this.getReportUUID()} 
                                   reportParameters={this.getReportParameter()}/>
            </div>
        );
    }

}

export default ListOfNewPatients;