import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, hashHistory } from 'react-router-dom';
import './MainLayout.css';
import ReportNavComponent from './ReportNavComponent';
import ListOfUsers from '../reports/ListOfUsers/ListOfUsers';
import ListOfProviders from '../reports/ListOfProviders/ListOfProviders';
import ListOfDiagnosis from '../reports/ListOfDiagnosis/ListOfDiagnosis';
import ListOfNewPatients from '../reports/ListOfNewPatients/ListOfNewPatients';
import NumberOfAdmissions from '../reports/NumberOfAdmissions/NumberOfAdmissions';
import NumberOfDischarges from '../reports/NumberOfDischarges/NumberOfDischarges';
import NumberOfPatients from '../reports/NumberOfPatients/NumberOfPatients';
import NumberOfTransfers from '../reports/NumberOfTransfers/NumberOfTransfers';
import NumberOfVisitNotes from '../reports/NumberOfVisitNotes/NumberOfVisitNotes';
import NumberOfVisits from '../reports/NumberOfVisits/NumberOfVisits';
import ListOfPatientsForDiagnosis from '../reports/ListOfPatientsForDiagnosis/ListOfPatientsForDiagnosis';
import ListOfPatientsForProvider from '../reports/ListOfPatientsForProvider/ListOfPatientsForProvider';

/**
 * This component will be shown in the left side which allows users to navigate through
 * different available reports
 */
class MainLayout extends Component {


  render() {
    return (
      <div className="pageContainer">
        <div className="reportNavBar">
          <ReportNavComponent />
        </div>
        <div className="reportContent">
          <Switch>
            <Route path="/ListOfUsers" component={ListOfUsers} />
            <Route path="/ListOfProviders" component={ListOfProviders} />
            <Route path="/ListOfPatientsForProvider/:providerUuid" component={ListOfPatientsForProvider} />
            <Route path="/ListOfDiagnosis" component={ListOfDiagnosis} />
            <Route path="/ListOfPatientsForDiagnosis/:diagnosisUuid" component={ListOfPatientsForDiagnosis} />
            <Route path="/ListOfNewPatients" component={ListOfNewPatients} />
            <Route path="/NumberOfAdmissions" component={NumberOfAdmissions} />
            <Route path="/NumberOfDischarges" component={NumberOfDischarges} />
            <Route path="/NumberOfPatients" component={NumberOfPatients} />
            <Route path="/NumberOfTransfers" component={NumberOfTransfers} />
            <Route path="/NumberOfVisitNotes" component={NumberOfVisitNotes} />
            <Route path="/NumberOfVisits" component={NumberOfVisits} />
            <Route component={ListOfUsers} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default MainLayout;