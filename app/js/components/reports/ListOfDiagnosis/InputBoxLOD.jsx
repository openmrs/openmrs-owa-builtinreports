import React, { Component, PropTypes } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import './InputBoxLOD.css';

/**
 * This component will render the input div which appear at the top of the page
 * 
 * @input: StartDate, EndDate
 * @desc: Date range can be selected for the user 
 */
class InputBoxLOD extends Component {

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
          <label className="textLabel">Encounters registered between: </label>
          <Datetime className="stDate" dateFormat="YYYY-MM-DD" closeOnSelect={true} onChange={this.props.stdlistener}
            isValidDate={this.valid} defaultValue={this.props.initStD} />

          <label className="textLabel"> and </label>
          <Datetime className="edDate" dateFormat="YYYY-MM-DD" closeOnSelect={true} onChange={this.props.etdlistener}
            isValidDate={this.valid} defaultValue={this.props.initEtD} />
        </div>
      </div>

    );
  }
}

InputBoxLOD.propTypes = {
  stdlistener: PropTypes.func.isRequired,
  etdlistener: PropTypes.func.isRequired,
  initStD: PropTypes.instanceOf(Date).isRequired,
  initEtD: PropTypes.instanceOf(Date).isRequired
};

export default InputBoxLOD;