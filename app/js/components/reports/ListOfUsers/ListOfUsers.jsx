import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';

/**
 * Display the result of List of Users report
 */
class ListOfUsers extends Component {

    constructor() {
        super();

        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
    }

    getReportUUID() {
        return "d3950d7c-4881-11e7-a919-92ebcb67fe33";
    }

    getReportParameter() {
        return {
            "retired": "false"
        };
    }

    render() {
        return (
            <div>
                <ReportAsTableView reportName="List of Users" 
                                   reportUUID={this.getReportUUID()} 
                                   reportParameters={this.getReportParameter()}/>
            </div>
        );
    }

}

export default ListOfUsers;