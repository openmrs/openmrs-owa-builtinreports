import React, { Component } from 'react';
import './ReportNavMenu.css';

/**
 * This component will be shown in the left side which allows users to navigate through
 * different available reports
 */
class ReportNavComponent extends Component {


    render(){
        return (
        <div className="container123">
            <div className="menuItem">
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> List of Users</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> List of Providers</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> List of Diagnosis</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> List of New Patient Registrations</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> Number of Admissions</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> Number of Discharges</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> Number of Patient Registrations</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> Number of Transfers</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> Number of Visit Notes</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> Number of Visits</p>
            </div>
        </div>
        );
    }
}

export default ReportNavComponent;