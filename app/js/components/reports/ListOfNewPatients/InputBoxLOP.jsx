import React, { Component, PropTypes } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import './InputBoxLOP.css';

/**
 * This component will render the input div which appear at the top of the page
 * 
 * @input: StartDate
 * @desc: Start Date to show the registered patients in the system
 */
class InputBoxLOP extends Component {

  constructor() {
    super();
    this.valid = this.valid.bind(this);
  }

  valid(selectedDateTime) {
    return moment().isAfter(selectedDateTime);
  }

  render() {
    return (
      <div className="inputBoxWrapper">
        <div className="innerWrapper">
          <label className="textLabel">Show patients registered since: </label>
          <div className="toggleContainer">
            <Datetime dateFormat="YYYY-MM-DD" closeOnSelect={true} onChange={this.props.listener}
              isValidDate={this.valid} defaultValue={this.props.initDateTime} />
          </div>
        </div>
      </div>

    );
  }
}

InputBoxLOP.propTypes = {
  listener: PropTypes.func.isRequired,
  initDateTime: PropTypes.instanceOf(Date).isRequired
};

export default InputBoxLOP;