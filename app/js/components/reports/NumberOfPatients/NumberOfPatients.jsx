import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';

/**
 * Display the result of Number of Patient Registrations report
 */
class NumberOfPatients extends Component {

    constructor() {
        super();

        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
    }

    getReportUUID() {
        return "d71b5170-5283-11e7-b114-b2f933d5fe66";
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
                <ReportAsTableView reportName="Number of Patient Registrations" 
                                   reportUUID={this.getReportUUID()} 
                                   reportParameters={this.getReportParameter()}/>
            </div>
        );
    }

}

export default NumberOfPatients;