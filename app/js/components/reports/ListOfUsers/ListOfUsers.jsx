import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import GroupByDateChart from '../common/GroupByDateChart';
import BasicXYChart from '../common/BasicXYChart';
import ReportTitle from '../common/ReportTitle';
import InputBox from './InputBox';

/**
 * Display the result of List of Users report
 */
class ListOfUsers extends Component {

    constructor() {
        super();
        this.state = {
            parameters: {
                retired: false
            }
        };

        this.getReportUUID = this.getReportUUID.bind(this);
        this.eventListenerForParameter = this.eventListenerForParameter.bind(this);
    }

    getReportUUID() {
        return "d3950d7c-4881-11e7-a919-92ebcb67fe33";
    }

    eventListenerForParameter(e) {
        this.setState(prevState => ({

            parameters: {
                retired: !prevState.parameters.retired
            }
        }));
    }

    render() {
        return (
            <div>
                <ReportTitle heading="List of Users" />
                <InputBox listener={this.eventListenerForParameter}/>
                <ReportAsTableView reportUUID={this.getReportUUID()}
                    reportParameters={this.state.parameters} />

                <GroupByDateChart reportUUID={this.getReportUUID()}
                    reportParameters={this.state.parameters} groupBy='month' />

                <BasicXYChart reportUUID={this.getReportUUID()} groupBy='week'
                    reportParameters={this.state.parameters}
                    X_label='username' Y_label='date_created' />
            </div>
        );
    }

}

export default ListOfUsers;