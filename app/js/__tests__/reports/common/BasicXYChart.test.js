import React from 'react';
import renderer from 'react-test-renderer';
import Line from 'react-chartjs';
import Chart from 'chart.js';
import { fakeRequestLibrary } from '../../../__mocks__/fakeRequestLibrary';
import { FAKE_RESPONSE } from '../../../__mocks__/fakeResponse';
import BasicXYChart from '../../../components/reports/common/BasicXYChart';

jest.mock('react-chartjs', () => 'Line');

describe('<BasicXYChart /> ', () => {
    it('component displays as expected', () => {
        const params = {
            retired: false
        };

        jest.mock('react-data-grid');
        var rendered = renderer.create(
            <BasicXYChart reportUUID="e451ae04-4881-11e7-a919-92ebcb67fe33"
                reportParameters={params}
                X_label='username' Y_label='date_created' limit={10}
                fetchData={fakeRequestLibrary('www.openmrs-fake-server.org', {}, true, FAKE_RESPONSE)} />
        );

        expect(rendered.toJSON()).toMatchSnapshot();
    });
});