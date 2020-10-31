import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddQuestion from './pages/teacher/Class';
import Class from './pages/teacher/Class';
import Detail from './pages/teacher/Detail';
import Group from './pages/teacher/Group';
import Homepage from './pages/teacher/Homepage';
import InClass from './pages/teacher/InClass';
import Question from './pages/teacher/Question';
import Student from './pages/teacher/Student';
import Teacher from './pages/teacher/Teacher';
import TestBank from './pages/teacher/TestBank';
import UserInfo from './pages/teacher/UserInfo';

function App() {
  return (
      <Router>
        <Route exact path="/AddQuestion"component={AddQuestion} />
        <Route exact path="/Class"component={Class} />
        <Route exact path="/Detail"component={Detail} />
        <Route exact path="/Group"component={Group} />
        <Route exact path="/"component={Homepage} />
        <Route exact path="/InClass"component={InClass} />
        <Route exact path="/Question"component={Question} />
        <Route exact path="/Student"component={Student} />
        <Route exact path="/Teacher"component={Teacher} />
        <Route exact path="/TestBank"component={TestBank} />
        <Route exact path="/UserInfo"component={UserInfo} />
        
        
      </Router>
  );
}

export default App;
