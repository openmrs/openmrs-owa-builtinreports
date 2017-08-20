import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';
import LocationInput from '../common/LocationInput';

/**
 * Display the result of Number of Admissions report
 */
class NumberOfAdmissions extends Component {

    constructor() {
        super();
        this.state = {
            parameters: null
        };
        this.getReportUUID = this.getReportUUID.bind(this);
        this.handleLocationSelector = this.handleLocationSelector.bind(this);
    }

    getReportUUID() {
        return "d39509bc-4881-11e7-a919-92ebcb67fe33";
    }

    handleLocationSelector(event) {
        this.setState({
            parameters: {
                location: event.target.value
            }
        });
    }

    render() {
        return (
            <div>
                <ReportTitle heading="Number of Admissions" />
                <LocationInput locationListener={this.handleLocationSelector} />

                <ReportAsTableView reportUUID={this.getReportUUID()}
                    reportParameters={this.state.parameters} />
            </div>
        );
    }

}

export default NumberOfAdmissions;