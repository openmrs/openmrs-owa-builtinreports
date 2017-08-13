import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import { fakeRequestLibrary } from '../../../__mocks__/fakeRequestLibrary';
import ReportAsTableView from '../../../components/reports/common/ReportAsTableView';

const SERVER_URL = "http://localhost:8080/openmrs/ws/rest/v1/reportingrest/reportdata/e451ae04-4881-11e7-a919-92ebcb67fe33";
const FAKE_RESPONSE = {
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

};

describe('<ReportAsTableView /> ', () => {
    it('renders correctly with success data received from server', () => {
        const params = {
            "startDate": "2017-05-05",
            "endDate": "2017-10-05"
        };

      
        var rendered = renderer.create(
            <ReportAsTableView reportUUID="e451ae04-4881-11e7-a919-92ebcb67fe33"
                reportParameters={params}
                fetchData={fakeRequestLibrary('www.openmrs-fake-server.org', {}, true, FAKE_RESPONSE)} />
        );

        expect(rendered.toJSON()).toMatchSnapshot();
    });
});