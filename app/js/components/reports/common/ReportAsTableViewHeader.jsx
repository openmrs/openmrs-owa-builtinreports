import React, { Component, PropTypes } from 'react';
import Datetime from 'react-datetime';
import './ReportAsTableViewHeader.css';

/**
 * This component will render the input div which appear at the top of the page
 */
class ReportAsTableViewHeader extends Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="reportTable-inputBoxWrapper">
        <div className="innerWrapper">
          <label className="textLabel">{this.props.totalCountLabel} : {this.props.totalCount} </label>
        </div>
      </div>
    );
  }
}

ReportAsTableViewHeader.propTypes = {
  reportParameters: PropTypes.object.isRequired
};

export default ReportAsTableViewHeader;