import React, { Component, PropTypes } from 'react';
import Datetime from 'react-datetime';
import './HeaderForPatientsDiagnosis.css';

/**
 * This component will render the input div which appear at the top of the page
 */
class HeaderForPatientsDiagnosis extends Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="inputBoxWrapper">
        <div className="backToPreviousReport">
          <div className="btn btn-success" onClick={this.props.bkBtnClick}>
            Back to Diagnosis Report
          </div>
        </div>
        <div className="innerWrapper">
          <label className="textLabel">Diagnosis Name : {this.props.reportParameters.diagnosis} </label>
        </div>
        <div className="innerWrapper">
          <label className="textLabel">Encounters registered between: {this.props.reportParameters.startDate}  </label>
          <label className="textLabel"> and {this.props.reportParameters.endDate}  </label>
        </div>
      </div>
    );
  }
}

HeaderForPatientsDiagnosis.propTypes = {
  reportParameters: PropTypes.object.isRequired,
  bkBtnClick: PropTypes.func.isRequired,
};

export default HeaderForPatientsDiagnosis;