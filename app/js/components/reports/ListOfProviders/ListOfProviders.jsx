import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';

/**
 * Display the result of List of providers report
 */
class ListOfProviders extends Component {

    constructor() {
        super();

        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
    }

    getReportUUID() {
        return "d3950ea8-4881-11e7-a919-92ebcb67fe33";
    }

    getReportParameter() {
        return {
            "retired": "false"
        };
    }

    render() {

        return (
            <div>
                <ReportTitle heading="List of Providers" />
                <ReportAsTableView reportUUID={this.getReportUUID()} 
                                   reportParameters={this.getReportParameter()}/>
            </div>
        );
    }

}

export default ListOfProviders;