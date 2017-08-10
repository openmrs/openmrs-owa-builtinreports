import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';
import InputBox from './InputBox';
import moment from 'moment';

/**
 * Display the result of Number of Patient Registrations report
 */
class NumberOfPatients extends Component {

    constructor() {
        super();
        var dateStart = moment().subtract(1, 'months').format('YYYY-MM-DD');
        var dateEnd = moment().format('YYYY-MM-DD');
        this.state = {
            parameters: {
                startDate: dateStart,
                endDate: dateEnd
            }
        };
        this.getReportUUID = this.getReportUUID.bind(this);
        this.eventListenerForStartDate = this.eventListenerForStartDate.bind(this);
        this.eventListenerForEndDate = this.eventListenerForEndDate.bind(this);
    }

    getReportUUID() {
        return "d71b5170-5283-11e7-b114-b2f933d5fe66";
    }

    eventListenerForStartDate(selectedDate) {
        if (moment(selectedDate).isValid()) {
            this.setState({
                parameters: {
                    startDate: selectedDate
                }
            });
        }
    }

    eventListenerForEndDate(selectedDate) {
        if (moment(selectedDate).isValid() && selectedDate.isAfter(this.state.parameters.startDate)) {
            this.setState({
                parameters: {
                    endDate: selectedDate
                }
            });
        }
    }

    render() {
        return (
            <div>
                <ReportTitle heading="Number of Patients" />
                <InputBox stdlistener={this.eventListenerForStartDate} 
                          etdlistener={this.eventListenerForEndDate} 
                          initStD={this.state.parameters.startDate}
                          initEtD={this.state.parameters.endDate}/>
                <ReportAsTableView reportUUID={this.getReportUUID()} 
                                   reportParameters={this.state.parameters}/>
            </div>
        );
    }

}

export default NumberOfPatients;