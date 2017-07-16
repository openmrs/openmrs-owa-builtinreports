import React, { Component } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
import './NumberOfVisits.css';

/**
 * Display the result of Number of Visits report
 */
class NumberOfVisits extends Component {

    constructor() {
        super();
        this.state = {
            NumberOfVisitsReport: {},
            reportColumnNames: Array(),
            reportRowData: Array()
        };
        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
        this.resolveResponse = this.resolveResponse.bind(this);
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

    resolveResponse(data) {
        this.setState({ reportColumnNames: data.dataSets[0].metadata.columns });
        this.setState({ reportRowData: data.dataSets[0].rows });
    }


    componentDidMount() {

        new ApiHelper().post(ReportConstants.REPORT_REQUEST + this.getReportUUID(), this.getReportParameter())
            .then((response) => {
                this.resolveResponse(response);
                this.setState({ NumberOfVisitsReport: response });
            });
    }


    render() {
        return (
            <div>
                <h1>
                    Number of Visits
                </h1>

                <table className="reportTable">
                    <thead>
                        <tr>
                            {
                                this.state.reportColumnNames.map(function (element) {
                                    return (
                                        <th key={element.name}>{element.label}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.reportRowData.map(function (rowObj, index) {

                                return (
                                    <tr key={index}>
                                        {
                                            this.state.reportColumnNames.map(function (element) {

                                                return (<td key={element.name}>{rowObj[element.name]}</td>)

                                            })

                                        }
                                    </tr>
                                )

                            }, this)
                        }
                    </tbody>

                </table>
            </div>
        );
    }

}

export default NumberOfVisits;