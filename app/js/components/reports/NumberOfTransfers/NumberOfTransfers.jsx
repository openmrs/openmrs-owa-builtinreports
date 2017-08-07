import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';

/**
 * Display the result of Number of Transfers report
 */
class NumberOfTransfers extends Component {

    constructor() {
        super();

        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
    }

    getReportUUID() {
        return "b39c4c4c-4881-11e7-a919-92ebcb67fe33";
    }

    getReportParameter() {
        return {
            "location": "8d6c993e-c2cc-11de-8d13-0010c6dffd0f"
        };
    }

    render() {
        return (
            <div>
                <ReportTitle heading="Number of Transfers" />
                <ReportAsTableView reportUUID={this.getReportUUID()} 
                                   reportParameters={this.getReportParameter()}/>
            </div>
        );
    }

}

export default NumberOfTransfers;