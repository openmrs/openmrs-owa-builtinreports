import React, { Component, PropTypes } from 'react';
import '../ListOfUsers/ListOfUsersInputBox.css'; 

/**
 * This component will render the input div which appear at the top of the page
 */
class NumberOfVisitNotessInputBox extends Component {


  render() {
    return (
      <div className="inputBoxWrapper">
        <div className="innerWrapper">
          <label className="textLabel">Include Active Visits : </label>
          <div className="toggleContainerLOU">
            <label className="switch">
              <input type="checkbox" onChange={this.props.listener} />
              <span className="slider round"/>
            </label>
          </div>
        </div>
      </div>);
  }
}

NumberOfVisitNotessInputBox.propTypes = {
  listener: PropTypes.func.isRequired
};

export default NumberOfVisitNotessInputBox;