
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import ReportAsTableView from '../../../components/reports/common/ReportAsTableView';

const SERVER_URL = "http://localhost:8080/openmrs/ws/rest/v1/reportingrest/reportdata/e451ae04-4881-11e7-a919-92ebcb67fe33";
const FAKE_RESPONSE = {
    report: {
        definition: {
            name: 'FAKE NAME'
        }
    }
};

describe('<ReportAsTableView /> ', () => {
    it('renders correctly with success data received from server', () => {
        const params = {
            "startDate": "2017-05-05",
            "endDate": "2017-10-05"
        };

        var server = sinon.fakeServer.create();
        server.respondWith('POST', SERVER_URL, JSON.stringify(FAKE_RESPONSE));

        const rendered = renderer.create(
            <ReportAsTableView reportUUID="e451ae04-4881-11e7-a919-92ebcb67fe33"
                reportParameters={params} />
        );
        server.respond();
        server.restore();

        expect(rendered.toJSON()).toMatchSnapshot();
    });
});