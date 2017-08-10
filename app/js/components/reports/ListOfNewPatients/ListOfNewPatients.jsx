import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';
import InputBox from './InputBox';
import moment from 'moment';

/**
 * Display the result of List of New Patient Registrations report
 */
class ListOfNewPatients extends Component {

    constructor() {
        super();
        var date = moment().subtract(1, 'months').format('YYYY-MM-DD');
        this.state = {
            parameters: {
                startDate: date
            }
        };
        this.getReportUUID = this.getReportUUID.bind(this);
        this.eventListenerForParameter = this.eventListenerForParameter.bind(this);
    }

    getReportUUID() {
        return "e451a9d6-4881-11e7-a919-92ebcb67fe33";
    }

    eventListenerForParameter(selectedDate) {
        if (moment(selectedDate).isValid()) {
            this.setState({
                parameters: {
                    startDate: selectedDate
                }
            });
        }
    }

    render() {
        return (
            <div>

                <ReportTitle heading="List of New Patient Registrations" />
                <InputBox listener={this.eventListenerForParameter} initDateTime={this.state.parameters.startDate}/>
                <ReportAsTableView reportUUID={this.getReportUUID()}
                    reportParameters={this.state.parameters} />
            </div>
        );
    }

}

export default ListOfNewPatients;