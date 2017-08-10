import React, { Component } from 'react';
import '../ListOfUsers/InputBox.css';
import Datetime from 'react-datetime';
import moment from 'moment';
import './InputBox.css'

/**
 * This component will render the input div which appear at the top of the page
 * 
 * @input: StartDate
 * @desc: Start Date to show the registered patients in the system
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
                <label className="textLabel">Show patients registered since: </label>
                <div className="toggleContainer">
                    <Datetime dateFormat="YYYY-MM-DD" closeOnSelect='true' onChange={this.props.listener}
                        isValidDate={this.valid} defaultValue={this.props.initDateTime}/>
                </div>
            </div>

        );
    }
}


export default InputBox;