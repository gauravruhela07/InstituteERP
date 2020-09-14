import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Student from './components/Student/student';
import Admin from './components/Admin/admin';
import Faculty from './components/Faculty/faculty';
import HomePage from './homepage';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={HomePage}/>
        <Route path='/student' exact component={Student}/>
        <Route path='/admin' exact component={Admin}/>
        <Route path='/faculty' exact component={Faculty}/>
      </Router>
    </div>
  );
}

export default App;
