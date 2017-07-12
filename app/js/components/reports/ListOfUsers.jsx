import React, { Component } from 'react';
import { ApiHelper } from '../../helpers/apiHelper';

/**
 * Display the result of ListOfUsers report
 */
class ListOfUsers extends Component {



    constructor() {
        super();
        this.state = {
            listOfUsersReport: []
        };
        this.getReportParameter = this.getReportParameter.bind(this);

    }

    componentWillMount() {

        this.fetchLocation('reportingrest/reportRequest/reportDefinition/d3950d7c-4881-11e7-a919-92ebcb67fe33', this.getReportParameter())
            .then((response) => {
                console.log('response from openmrs server : ' + response);
                this.setState({ listOfUsersReport: response });
            });


    }

    getReportParameter() {
        return {
            "retired": "false"
        };
    }

    fetchLocation(url, paramData) {
        const apiHelper = new ApiHelper(null);
        const getData = new Promise(function (resolve, reject) {
            apiHelper.post(url, paramData).then(response => {
                response.json().then(data => {
                    resolve(data);
                });
            });
        });
        return getData;
    }

    render() {


        return (
            <h1>
                records fetched size: {this.state.listOfUsersReport.dataSets.rows}
            </h1>
        );
    }

}

export default ListOfUsers;