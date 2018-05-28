import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import ReactDataGrid from 'react-data-grid';
import { fakeRequestLibrary } from '../../../__mocks__/fakeRequestLibrary';
import { FAKE_RESPONSE } from '../../../__mocks__/fakeResponse';
import ReportAsTableView from '../../../components/reports/common/ReportAsTableView';
import { MemoryRouter as Router, withRouter } from 'react-router-dom' 

jest.mock('react-data-grid', () => 'ReactDataGrid');

describe('<ReportAsTableView /> ', () => {
    it('component displays as expected', () => {
        const params = {
            retired: false
        };

        jest.mock('react-data-grid');
        var rendered = renderer.create(
            <Router>
                <ReportAsTableView reportUUID="e451ae04-4881-11e7-a919-92ebcb67fe33"
                reportParameters={params}
                fetchData={fakeRequestLibrary('www.openmrs-fake-server.org', {}, true, FAKE_RESPONSE)} />
            </Router>
        );

        expect(rendered.toJSON()).toMatchSnapshot();
    });
});