import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './ReportNavMenu.css';

/**
 * This component will be shown in the left side which allows users to navigate through
 * different available reports
 */
class ReportNavComponent extends Component {


    render() {
        return (
            <div className="container123">
                <div className="menuItem">
                    <p className="contentParagraph">
                        <i className="glyphicon glyphicon-list-alt float-left" ></i>
                        <NavLink activeClassName="active" to="/ListOfUsers">
                            List of Users
                        </NavLink>
                    </p>
                </div>
                <div className="menuItem">
                    <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i>
                        <NavLink to="/ListOfProviders">
                            List of Providers
                        </NavLink>
                    </p>
                </div>
                <div className="menuItem">
                    <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i>
                        <NavLink to="/ListOfDiagnosis">
                            List of Diagnosis
                        </NavLink>
                    </p>
                </div>
                <div className="menuItem">
                    <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i>
                        <NavLink to="/ListOfNewPatients">
                            List of New Patient Registrations
                        </NavLink>
                    </p>
                </div>
                <div className="menuItem">
                    <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i>
                        <NavLink to="/NumberOfAdmissions">
                            Number of Admissions
                        </NavLink>
                    </p>
                </div>
                <div className="menuItem">
                    <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i>
                        <NavLink to="/NumberOfDischarges">
                            Number of Discharges
                        </NavLink>
                    </p>
                </div>
                <div className="menuItem">
                    <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i>
                        <NavLink to="/NumberOfPatients">
                            Number of Patient Registrations
                        </NavLink>
                    </p>
                </div>
                <div className="menuItem">
                    <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i>
                        <NavLink to="/NumberOfTransfers">
                            Number of Transfers
                        </NavLink>
                    </p>
                </div>
                <div className="menuItem">
                    <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i>
                        <NavLink to="/NumberOfVisitNotes">
                            Number of Visit Notes
                        </NavLink>
                    </p>
                </div>
                <div className="menuItem">
                    <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i>
                        <NavLink to="/NumberOfVisits">
                            Number of Visits
                        </NavLink>
                    </p>
                </div>
                
            </div>
        );
    }
}

export default ReportNavComponent;