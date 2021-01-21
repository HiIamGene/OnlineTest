import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddQuestion from './pages/teacher/Addquestion';
import Course from './pages/teacher/Course';
import Detail from './pages/teacher/Detail';
import Group from './pages/teacher/Group';
import Homepage from './pages/Homepage';
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
import history from "./utils/history";
import Course2 from './pages/student/Course';


function App() {
  /*const { loggedInStatus, setloggedInStatus } = useState("Not logged in");
  const handleLogin = (data) => {

    setloggedInStatus("Logged in")
    setuser(data)
  }*/

  return (
      <Router history={history}>
        <Route exact path="/"exact component={Homepage} />
        <Route exact path="/Teacher/AddQuestion"exact component={AddQuestion} />
        <Route exact path="/Teacher/Course"exact component={Course} />
        <Route exact path="/Teacher/Detail"exact component={Detail} />
        <Route exact path="/Teacher/Group"exact component={Group} />
        <Route exact path="/Teacher/InClass"exact component={InClass} />
        <Route exact path="/Teacher/Question"exact component={Question} />
        <Route exact path="/Teacher/Student"exact component={Student} />
        <Route exact path="/Teacher/Teacher"exact component={Teacher} />
        <Route exact path="/Teacher/TestBank"exact component={TestBank} />
        <Route exact path="/Teacher/UserInfo"exact component={UserInfo} />
        <Route exact path="/Teacher/ScoreTest"exact component={ScoreTest} /> 
        <Route exact path="/Teacher/ScoreStudent"exact component={ScoreStudent} /> 
        <Route exact path="/Teacher/ScoreQuestion"exact component={ScoreQuestion} />
        <Route exact path="/Teacher/GroupTestBank"exact component={GroupTestBank} />
        <Route exact path="/Student/Course"exact component={Course2} />

      </Router>
  );
}

export default App;
