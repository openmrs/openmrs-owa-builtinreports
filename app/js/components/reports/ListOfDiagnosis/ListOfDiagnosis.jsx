import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import BasicXYChart from '../common/BasicXYChart';
import ReportTitle from '../common/ReportTitle';

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

                <ReportTitle heading="List of Diagnosis" />
                <ReportAsTableView reportUUID={this.getReportUUID()} 
                                   reportParameters={this.getReportParameter()}/>

                <BasicXYChart reportUUID={this.getReportUUID()}
                                  reportParameters={this.getReportParameter()}
                                  X_label='name' Y_label='count'/>
            </div>
        );
    }

}

export default ListOfDiagnosis;