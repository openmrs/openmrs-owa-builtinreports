import React, { Component } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';
import { CommonReportUtil } from '../../../helpers/CommonReportUtil';
import ReactDataGrid from 'react-data-grid';
import DataNotFound from './DataNotFound';
import moment from 'moment';
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
        this.resolveResponse = this.resolveResponse.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.init = this.init.bind(this);
    }

    componentDidMount() {
        if(new CommonReportUtil().validateReportParams(this.props.reportParameters)){
            this.init(this.props.reportParameters);
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if(new CommonReportUtil().validateReportParams(nextProps.reportParameters)){
            this.init(nextProps.reportParameters);
        }
    }

    init(params) {

        if(this.props.fetchData != null){
            //Test Path
            this.resolveResponse(this.props.fetchData.body);
        }else{
            new ApiHelper().post(ReportConstants.REPORT_REQUEST + this.props.reportUUID, params)
            .then((response) => {
                this.resolveResponse(response);
            });
        }
    }

    resolveResponse(data) {
        this.setState({ report: data });
        this.setState({ reportColumnNames: data.dataSets[0].metadata.columns });
        this.setState({ reportRowData: data.dataSets[0].rows });
    }

    getColumns() {
        var columns = this.state.reportColumnNames.map(function (element) {

            var displayName = element.label;
            if(displayName.indexOf('_') > -1){
                displayName = displayName.replace(/_/g, ' ');
            }
            return { key: element.name, name: displayName, resizable: true };
        });
        return columns;
    }

    rowGetter(i) {
        let row = this.state.reportRowData[i];

        //format a date value if found any in the table
        Object.keys(row).forEach(function (key, index) {
            if (row[key] != null && row[key] != 'undefined' && isNaN(row[key]) && moment(row[key], moment.ISO_8601, true).isValid()) {
                row[key] = moment(row[key], moment.ISO_8601, true).format("YYYY-MM-DD HH:mm:ss");
            }
            if(row[key] == null) {
                row[key] = "";
            }
        });
        return row;
    }


    render() {
        return (
            <div className="TableDivHolder">

                {this.getColumns().length > 0 ? (
                    
                    <ReactDataGrid
                        columns={this.getColumns()}
                        rowGetter={this.rowGetter}
                        rowsCount={this.state.reportRowData.length}
                        minHeight={280} />
                ) : (
                    <DataNotFound componentName="Report Table"/>
                )}
                
            </div>
        );
    }

}

export default ReportAsTableView;