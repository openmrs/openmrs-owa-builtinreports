import React, { Component } from 'react';
import './ReportNavMenu.css';

/**
 * This component will be shown in the left side which allows users to navigate through
 * different available reports
 */
class ReportNavComponent extends Component {


    render(){
        return (
        <div className="container">
            <div className="menuItem">
                First element
            </div>
            <div className="menuItem">
                Second element
            </div>
            <div className="menuItem">
                Third element
            </div>
        </div>
        );
    }
}

export default ReportNavComponent;