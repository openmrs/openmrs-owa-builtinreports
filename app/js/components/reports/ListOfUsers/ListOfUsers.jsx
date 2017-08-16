import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import GroupByDateChart from '../common/GroupByDateChart';
import BasicXYChart from '../common/BasicXYChart';
import ReportTitle from '../common/ReportTitle';
import ListOfUsersInputBox from './ListOfUsersInputBox';
import { fakeRequestLibrary } from '../../../__mocks__/fakeRequestLibrary';

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
        this.FAKE_RESPONSE = this.FAKE_RESPONSE.bind(this);
    }

    FAKE_RESPONSE() {
        return {
            dataSets: [
                {
                    metadata: {
                        columns: [
                            {
                                name: "username",
                                label: "username"
                            },
                            {
                                name: "date_created",
                                label: "date_created"
                            }
                        ]
                    },
                    rows: [
                        {
                            date_created: "2010-04-26T13:25:00.000+0530",
                            username: "daemon"
                        },
                        {
                            date_created: "2017-06-08T21:37:18.000+0530",
                            username: "clerk"
                        },
                        {
                            date_created: "2017-07-08T21:37:18.000+0530",
                            username: "nurse"
                        },
                        {
                            date_created: "2017-07-08T21:37:19.000+0530",
                            username: "doctor"
                        },
                        {
                            date_created: "2017-07-08T21:37:18.000+0530",
                            username: "sysadmin"
                        }
                    ]
                }
            ]

        }
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
                <ListOfUsersInputBox listener={this.eventListenerForParameter} />

                <ReportAsTableView reportUUID={this.getReportUUID()}
                    reportParameters={this.state.parameters} />

                <GroupByDateChart reportUUID={this.getReportUUID()}
                    reportParameters={this.state.parameters} groupBy='month' />
            </div>
        );
    }

}

export default ListOfUsers;