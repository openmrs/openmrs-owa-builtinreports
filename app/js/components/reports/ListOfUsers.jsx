import React, { Component } from 'react';
import { ApiHelper } from '../../helpers/apiHelper';

/**
 * Display the result of ListOfUsers report
 */
class ListOfUsers extends Component {



    constructor() {
        super();
        this.state = {
            listOfUsersReport: null,
            reportColumnNames: null,
            reportData: null
        };
        this.getReportParameter = this.getReportParameter.bind(this);

    }

    getReportParameter() {
        return {
            "retired": "false"
        };
    }

    resolveResponse(data){
        const columnHeaders = extractColumnNamesFromResponse(data.datasets[0].metadata);

    }

    extractColumnNamesFromResponse(metadata){
        const columnCount = metadata.length;
        let columnArray = Array();

        for(let i=0; i < columnCount; i++){
            columnArray.push(metadata.columns[i].label);
        }

        return columnArray;
    }

    extractRowDataFromResponse(columnNames, rows){
        const rowCount = rows.length;
        let columnArray = Array();

        for(let i=0; i < rowCount; i++){
            for(let j=0; j <columnNames.length; j++){
                
                if(columnNames[j] == rows[i])
                const value = columnNames[]
            }
        }

        return columnArray;
    }

    componentDidMount() {

        new ApiHelper().post('reportingrest/reportdata/d3950d7c-4881-11e7-a919-92ebcb67fe33', this.getReportParameter())
            .then((response) => {
                alert('response from openmrs server : ' + response.data);
                console.log('response from openmrs server : ' + response);
                this.setState({listOfUsersReport: JSON.stringify(response) });
            });


    }


    render() {
        return (
            <h1>
                records fetched size: {this.state.listOfUsersReport}
            </h1>
        );
    }

}

export default ListOfUsers;