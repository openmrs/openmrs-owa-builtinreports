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
                <p className="contentParagraph"><i className="glyphicon glyphicon-list-alt float-left" ></i> First element</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph">Second element</p>
            </div>
            <div className="menuItem">
                <p className="contentParagraph">Third element</p>
            </div>
    
        </div>
        );
    }
}

export default ReportNavComponent;