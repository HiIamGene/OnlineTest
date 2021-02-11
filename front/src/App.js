import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddQuestion from './pages/teacher/Addquestion';
import Course from './pages/teacher/Course';
import Detail from './pages/teacher/Detail';
import Group from './pages/teacher/Group';
import Homepage from './pages/Homepage';
import Accept from './pages/Accept';
import InClass from './pages/teacher/InCourse';
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
/*const apiUrl = 'http://142.93.177.152:10000';
axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);*/

function App() {
  /*const { loggedInStatus, setloggedInStatus } = useState("Not logged in");
  const handleLogin = (data) => {

    setloggedInStatus("Logged in")
    setuser(data)
  }*/
  //const { username, setUsername }=useState("T.Somchai")
  useEffect(() => {
    if (localStorage.getItem('token') ==null){
      history.push(`/`)
    }
  }, []);
  return (
    <Router history={history} username="T.Somchai">
      <Route exact path="/" exact component={Homepage} />
      <Route exact path="/Accept" exact component={Accept} />
      <Route exact path="/Teacher/AddQuestion" exact component={AddQuestion} />
      <Route exact path="/Teacher/Course" exact component={Course} />
      <Route exact path="/Teacher/Detail" exact component={Detail} />
      <Route exact path="/Teacher/Group" exact component={Group} />
      <Route exact path="/Teacher/InCourse" exact component={InClass} />
      <Route exact path="/Teacher/Question" exact component={Question} />
      <Route exact path="/Teacher/Student" exact component={Student} />
      <Route exact path="/Teacher/Teacher" exact component={Teacher} />
      <Route exact path="/Teacher/TestBank" exact component={TestBank} />
      <Route exact path="/Teacher/UserInfo" exact component={UserInfo} />
      <Route exact path="/Teacher/ScoreTest" exact component={ScoreTest} />
      <Route exact path="/Teacher/ScoreStudent" exact component={ScoreStudent} />
      <Route exact path="/Teacher/ScoreQuestion" exact component={ScoreQuestion} />
      <Route exact path="/Teacher/GroupTestBank" exact component={GroupTestBank} />
      <Route exact path="/Student/Course" exact component={Course2} />

    </Router>
  );
}

export default App;
