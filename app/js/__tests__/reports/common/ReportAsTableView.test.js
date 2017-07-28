
import React from 'react';
import renderer from 'react-test-renderer';
import ReportAsTableView from '../../../components/reports/common/ReportAsTableView';

describe('ReportAsTableView renders correctly ', () => {
    it('renders correctly', () => {
        const params = {
            "startDate": "2017-05-05",
            "endDate": "2017-10-05"
        };

        const rendered = renderer.create(
                <ReportAsTableView reportUUID="e451ae04-4881-11e7-a919-92ebcb67fe33" 
                reportParameters= {params} />
        );
        expect(rendered.toJSON()).toMatchSnapShot();
    });
});