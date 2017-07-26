import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';

/**
 * Display the result of List of diagnosis report
 */
class ListOfDiagnosis extends Component {

    constructor() {
        super();

        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
    }

    getReportUUID() {
        return "e451ae04-4881-11e7-a919-92ebcb67fe33";
    }

    getReportParameter() {
        return {
            "startDate": "2017-05-05",
            "endDate": "2017-10-05"
        };
    }

    render() {
        return (
            <div>
                <ReportAsTableView reportUUID={this.getReportUUID()} 
                                   reportParameters={this.getReportParameter()}/>
            </div>
        );
    }

}

export default ListOfDiagnosis;