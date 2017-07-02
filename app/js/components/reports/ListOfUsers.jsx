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

    }

    componentWillMount() {

        this.fetchLocation('reportingrest/reportRequest?reportDefinition=d3950d7c-4881-11e7-a919-92ebcb67fe33').then((response) => {
            this.setState({ listOfUsersReport: response });
        });
    }

    fetchLocation(url) {
        const apiHelper = new ApiHelper(null);
        const getData = new Promise(function (resolve, reject) {
            apiHelper.get(url).then(response => {
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
                records fetched: {this.state.listOfUsersReport.length}
            </h1>
        );
    }

}

export default ListOfUsers;