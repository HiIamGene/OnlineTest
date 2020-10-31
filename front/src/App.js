import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from './pages/teacher/Homepage';
import Class from './pages/teacher/Class';
import UserInfo from './pages/teacher/Class';
import Group from './pages/teacher/Class';
import AddQuestion from './pages/teacher/Class';
function App() {
  return (
      <Router>
        <Route exact path="/"component={Homepage} />
        <Route exact path="/Class"component={Class} />
        <Route exact path="/UserInfo"component={UserInfo} />
        <Route exact path="/Group"component={Group} />
        <Route exact path="/AddQuestion"component={AddQuestion} />
      </Router>
  );
}

export default App;
