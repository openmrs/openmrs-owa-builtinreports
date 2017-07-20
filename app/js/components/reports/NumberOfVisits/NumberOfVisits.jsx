import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';

/**
 * Display the result of Number of Visits report
 */
class NumberOfVisits extends Component {

    constructor() {
        super();

        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
    }

    getReportUUID() {
        return "9667a78e-4881-11e7-a919-92ebcb67fe33";
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
                <ReportAsTableView reportName="Number of Visits" 
                                   reportUUID={this.getReportUUID()} 
                                   reportParameters={this.getReportParameter()}/>
            </div>
        );
    }

}

export default NumberOfVisits;