import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddQuestion from './pages/teacher/Addquestion';
import Course from './pages/teacher/Course';
import Detail from './pages/teacher/Detail';
import Group from './pages/teacher/Group';
import Homepage from './pages/teacher/Homepage';
import InClass from './pages/teacher/InClass';
import Question from './pages/teacher/Question';
import Student from './pages/teacher/Student';
import Teacher from './pages/teacher/Teacher';
import TestBank from './pages/teacher/TestBank';
import UserInfo from './pages/teacher/UserInfo';
import ScoreTest from './pages/teacher/ScoreTest';
import ScoreStudent from './pages/teacher/ScoreStudent';
import ScoreQuestion from './pages/teacher/ScoreQuestion';
import GroupTestBank from './pages/teacher/GroupTestBank';
import Homepage2 from './pages/student/Homepage';


function App() {
  return (
      <Router>
        <Route exact path="/AddQuestion"component={AddQuestion} />
        <Route exact path="/Course"component={Course} />
        <Route exact path="/Detail"component={Detail} />
        <Route exact path="/Group"component={Group} />
        <Route exact path="/"component={Homepage} />
        <Route exact path="/InClass"component={InClass} />
        <Route exact path="/Question"component={Question} />
        <Route exact path="/Student"component={Student} />
        <Route exact path="/Teacher"component={Teacher} />
        <Route exact path="/TestBank"component={TestBank} />
        <Route exact path="/UserInfo"component={UserInfo} />
        <Route exact path="/ScoreTest"component={ScoreTest} /> 
        <Route exact path="/ScoreStudent"component={ScoreStudent} /> 
        <Route exact path="/ScoreQuestion"component={ScoreQuestion} />
        <Route exact path="/GroupTestBank"component={GroupTestBank} />
        
        <Route exact path="/s"component={Homepage2} />
      </Router>
  );
}

export default App;
