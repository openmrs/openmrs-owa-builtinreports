import React, { Component, PropTypes } from 'react';
import Datetime from 'react-datetime';
import './HeaderForPatientsForProvider.css';

/**
 * This component will render the input div which appear at the top of the page
 */
class HeaderForPatientsForProvider extends Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="inputBoxWrapper">
        <div className="backToPreviousReport">
          <div className="btn btn-success" onClick={this.props.bkBtnClick}>
            Back to Provider Report
          </div>
        </div>
        <div className="innerWrapper">
          <label className="textLabel">Provider Name : {this.props.reportParameters.givenname} &nbsp; 
           {this.props.reportParameters.familyname} &nbsp;
           (Role : {this.props.reportParameters.rolename})  </label>
        </div>
        <div className="innerWrapper lastHeaderLabel">
          <label className="textLabel">Created at : {this.props.reportParameters.created}  </label>
        </div>
      </div>
    );
  }
}

HeaderForPatientsForProvider.propTypes = {
  reportParameters: PropTypes.object.isRequired,
  bkBtnClick: PropTypes.func.isRequired,
};

export default HeaderForPatientsForProvider;