import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';

/**
 * Display the result of Number of Discharges report
 */
class NumberOfDischarges extends Component {

    constructor() {
        super();

        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
    }

    getReportUUID() {
        return "b39c5070-4881-11e7-a919-92ebcb67fe33";
    }

    getReportParameter() {
        return {
            "location": "1"
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

export default NumberOfDischarges;