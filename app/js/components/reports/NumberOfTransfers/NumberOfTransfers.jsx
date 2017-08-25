import React, { Component } from 'react';
import ReportAsTableView from '../common/ReportAsTableView';
import ReportTitle from '../common/ReportTitle';
import LocationInput from '../common/LocationInput';
import InfoMessage from '../common/InfoMessage';

/**
 * Display the result of Number of Transfers report
 */
class NumberOfTransfers extends Component {

    constructor() {
        super();
        this.state = {
            parameters: {
                location: ''
            }
        };
        this.getReportUUID = this.getReportUUID.bind(this);
        this.handleLocationSelector = this.handleLocationSelector.bind(this);
    }

    getReportUUID() {
        return "b39c4c4c-4881-11e7-a919-92ebcb67fe33";
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
                <ReportTitle heading="Number of Transfers" />
                <LocationInput locationListener={this.handleLocationSelector} />

                {this.state.parameters.location != null && this.state.parameters.location != '' ? (

                    <ReportAsTableView reportUUID={this.getReportUUID()}
                    reportParameters={this.state.parameters} />

                ) : (
                        <InfoMessage componentName="location" />
                    )}
            </div>
        );
    }

}

export default NumberOfTransfers;