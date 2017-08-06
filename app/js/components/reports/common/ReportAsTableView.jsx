import React, { Component } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
import ReactDataGrid from 'react-data-grid';
import moment from 'moment';

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
        this.rowGetter = this.rowGetter.bind(this);
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

    getColumns() {
        var columns = this.state.reportColumnNames.map(function (element) {
            return { key: element.name, name: element.label, resizable: true };

        });
        return columns;
    }

    rowGetter(i) {
        let row = this.state.reportRowData[i];

        Object.keys(row).forEach(function(key,index) {
            if(row[key] != null && row[key] != 'undefined' && isNaN(row[key]) && moment(row[key]).isValid()){
                row[key] = moment(row[key]).format("YYYY-MM-DD HH:mm:ss");
            }
        });
        return row;
    }


    render() {
        return (
            <div style={{border: '1px solid black'}}>

                <ReactDataGrid
                    columns={this.getColumns()}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.reportRowData.length} />


            </div>
        );
    }

}

export default ReportAsTableView;