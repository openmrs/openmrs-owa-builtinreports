import React, { Component } from 'react';
import { Link } from 'react-router';

import './breadCrumb.css';

class BreadCrumbComponent extends Component {
  componentDidMount() { }

  render() {
    return (
      <div className="breadcrumb">
        <a href="/openmrs/index.htm" className="breadcrumb-item">
          <span className="glyphicon glyphicon-home breadcrumb-item" aria-hidden="true" />
        </a>
        <span className="glyphicon glyphicon-chevron-right breadcrumb-item separator" aria-hidden="true" />
        <span className="title breadcrumb-item">Built-in Reports</span>
      </div>
    );
  }
}

export default BreadCrumbComponent;