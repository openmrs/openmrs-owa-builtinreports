import React, { Component } from 'react';
import '../ListOfUsers/InputBox.css';
import Datetime from 'react-datetime';
import moment from 'moment';
import './InputBox.css'

/**
 * This component will render the input div which appear at the top of the page
 * 
 * @input: StartDate, EndDate
 * @desc: Date range can be selected for the user 
 */
class InputBox extends Component {

    constructor() {
        super();
        this.valid = this.valid.bind(this);
    }

    valid(selectedDateTime) {
        return moment().isAfter(selectedDateTime);
    };

    render() {
        return (
            <div className="inputBoxWrapper">
                <label className="textLabel">Patients registered between: </label>
                <div className="toggleContainer">
                    <Datetime className="stDate" dateFormat="YYYY-MM-DD" closeOnSelect="true" onChange={this.props.stdlistener}
                        isValidDate={this.valid} defaultValue={this.props.initStD}/>
                </div>

                <label className="textLabel"> And </label>
                <div className="toggleContainer">
                    <Datetime className="edDate" dateFormat="YYYY-MM-DD" closeOnSelect="true" onChange={this.props.etdlistener}
                        isValidDate={this.valid} defaultValue={this.props.initEtD}/>
                </div>
            </div>

        );
    }
}


export default InputBox;