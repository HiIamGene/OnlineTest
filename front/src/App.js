import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddCampaign from './pages/AddCampaign';
import Campaign from './pages/Campaign';
import RealTime from './pages/RealTime';
import Payment from './pages/Payment';
import Acquistion from './pages/Acquistion';
import Homepage from './pages/Homepage';
import Menu from './pages/Menu';


function App() {
  return (
      <Router>
        <Route exact path="/"component={Menu} />
        <Route exact path="/campaign" component={Campaign} />
        <Route exact path="/campaign/add" component={AddCampaign} />
        <Route path="/realtime" component={RealTime} />
        <Route path="/payment" component={Payment} />
        <Route path="/acquisition" component={Acquistion} />
      </Router>
  );
}

export default App;
