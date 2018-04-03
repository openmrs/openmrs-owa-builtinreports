import React, { Component, PropTypes } from 'react';
import { ApiHelper } from '../../../helpers/apiHelper';
import * as ReportConstants from '../../../helpers/ReportConstants';

/**
 * This component will render the input div which appear at the top of the page
 * 
 * @input: location uuid
 * @desc: List all locations from OpenMRS server and show them in a Drop down
 */
class LocationInput extends Component {

  constructor(props) {
    super();
    this.state = {
      locations: Array()
    };
    this.init = this.init.bind(this);
    this.resolveResponse = this.resolveResponse.bind(this);
    this.makeItem = this.makeItem.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    this.init();
  }

  init() {
    new ApiHelper().get(ReportConstants.LOCATIONS)
      .then((response) => {
        this.resolveResponse(response);
      });
  }

  makeItem() {
    return this.state.locations.map((e, i) => {
      return <option value={e.uuid} key={i}>{e.display}</option>;
    });
  }

  resolveResponse(data) {
    this.setState({ locations: data.results });
  }

  render() {
    return (
      <div className="inputBoxWrapper">
        <div className="innerWrapper">
          <label className="textLabel">Location: </label>
          <select className="form-control" onChange={this.props.locationListener}>
            <option value="">Select Location</option>
            {this.makeItem()}
          </select>
        </div>
      </div>);
  }
}

LocationInput.propTypes = {
  locationListener: PropTypes.func.isRequired
};

export default LocationInput;