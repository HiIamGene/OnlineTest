import React, { useEffect } from 'react';
import './App.css';
import { Router, Route } from "react-router-dom";
import Course from './pages/teacher/Course';
import CreateTest from './pages/teacher/CreateTest';
import Group from './pages/teacher/Group';
import Homepage from './pages/Homepage';
import Accept from './pages/Accept';
import InClass from './pages/teacher/InCourse';
import Question from './components/addTest/Question2';
import Student from './pages/teacher/Student';
import Teacher from './pages/teacher/Teacher';
import TestBank from './pages/teacher/TestBank';
import QuestionTestBank from './pages/teacher/QuestionTestBank';
import UserInfo from './pages/teacher/UserInfo';
import ScoreTest from './pages/teacher/ScoreTest';
import ScoreStudent from './pages/teacher/ScoreStudent';
import ScoreQuestion from './pages/teacher/ScoreQuestion';
import GroupTestBank from './pages/teacher/GroupTestBank';
import history from "./utils/history";
import Course_S from './pages/student/Course';
import UserInfo_S from './pages/student/Course';
//import Todo from './pages/todo';
import Todo from './pages/Example';
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
      <Route  path="/" exact component={Homepage} />
      <Route  path="/Accept" exact component={Accept} />
      <Route  path="/Teacher/Course" exact component={Course} />
      <Route  path="/Teacher/Detail" exact component={CreateTest} />
      <Route  path="/Teacher/Group" exact component={Group} />
      <Route  path="/Teacher/InCourse" exact component={InClass} />
      <Route  path="/Teacher/Question" exact component={Question} />
      <Route  path="/Teacher/Student" exact component={Student} />
      <Route  path="/Teacher/Teacher" exact component={Teacher} />
      <Route  path="/Teacher/TestBank" exact component={TestBank} />
      <Route  path="/Teacher/QuestionTestBank" exact component={QuestionTestBank} />
      <Route  path="/Teacher/UserInfo" exact component={UserInfo} />
      <Route  path="/Teacher/ScoreTest" exact component={ScoreTest} />
      <Route  path="/Teacher/ScoreStudent" exact component={ScoreStudent} />
      <Route  path="/Teacher/ScoreQuestion" exact component={ScoreQuestion} />
      <Route  path="/Teacher/GroupTestBank" exact component={GroupTestBank} />
      <Route  path="/Student/UserInfo" exact component={UserInfo_S} />
      <Route  path="/Student/Course" exact component={Course_S} />
      <Route  path="/Todo" exact component={Todo} />

    </Router>
  );
}

export default App;
