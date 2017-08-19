import React from 'react';
import renderer from 'react-test-renderer';
import Line from 'react-chartjs';
import { fakeRequestLibrary } from '../../../__mocks__/fakeRequestLibrary';
import { FAKE_RESPONSE } from '../../../__mocks__/fakeResponse';
import GroupByDateChart from '../../../components/reports/common/GroupByDateChart';

jest.mock('react-chartjs', () => 'Line');

describe('<GroupByDateChart /> ', () => {
    it('component displays as expected', () => {
        const params = {
            retired: false
        };

        jest.mock('react-data-grid');
        var rendered = renderer.create(
            <GroupByDateChart reportUUID="e451ae04-4881-11e7-a919-92ebcb67fe33"
                reportParameters={params} groupBy='month'
                fetchData={fakeRequestLibrary('www.openmrs-fake-server.org', {}, true, FAKE_RESPONSE)} />
        );

        expect(rendered.toJSON()).toMatchSnapshot();
    });
});