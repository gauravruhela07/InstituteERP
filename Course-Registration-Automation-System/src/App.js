import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

// components
import Admin from './components/Admin/admin';
import Faculty from './components/Faculty/faculty';
import HomePage from './homepage';

import StudentLogin from './components/Student/student.login';
import StudentCourses from './components/Student/student.courses';
import StudentHome from './components/Student/student.home';
import StudentLogout from './components/Student/student.logout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={HomePage}/>

        {/* Student Routers */}
        <Route path='/student/login' exact component={StudentLogin}/>
        <Route path='/student/home' exact component={StudentHome}/>
        <Route path='/student/logout' exact component={StudentLogout}/>
        <Route path='/student/courses' exact component={StudentCourses}/>

        <Route path='/admin' exact component={Admin}/>
        <Route path='/faculty' exact component={Faculty}/>
      </Switch>
    </div>
  );
}

export default App;
