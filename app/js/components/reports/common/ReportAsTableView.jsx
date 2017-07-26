import React, { Component } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
import './ReportAsTableView.css';

/**
 * Display results of a report as a table
 */
class ReportAsTableView extends Component {

    constructor(props) {
        super();
        this.state = {
            report: {
                definition: {
                    name: ''
                }
            },
            reportColumnNames: Array(),
            reportRowData: Array()
        };
        this.getReportUUID = this.getReportUUID.bind(this);
        this.getReportParameter = this.getReportParameter.bind(this);
        this.resolveResponse = this.resolveResponse.bind(this);
    }

    getReportUUID() {
        return this.props.reportUUID;
    }

    getReportParameter() {
        return this.props.reportParameters;
    }

    resolveResponse(data) {
        this.setState({ report: data });
        this.setState({ reportColumnNames: data.dataSets[0].metadata.columns });
        this.setState({ reportRowData: data.dataSets[0].rows });
    }


    componentDidMount() {

        new ApiHelper().post(ReportConstants.REPORT_REQUEST + this.getReportUUID(), this.getReportParameter())
            .then((response) => {
                this.resolveResponse(response);
            });
    }


    render() {
        return (
            <div>
                <h1>
                    {this.state.report.definition.name}
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

export default ReportAsTableView;