import React, { Component } from 'react';
import './MainLayout.css';
import ReportNavComponent from './ReportNavComponent';
import ListOfUsers from '../reports/ListOfUsers/ListOfUsers';



/**
 * This component will be shown in the left side which allows users to navigate through
 * different available reports
 */
class MainLayout extends Component {


    render(){
        return (
        <div className="pageContainer">
            <div className="reportNavBar">
                <ReportNavComponent />
            </div>
            <div className="reportContent">
                <ListOfUsers />
            </div>
        </div>
        );
    }
}

export default MainLayout;