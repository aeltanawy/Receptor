import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import './App.css';

function App() {
  return (
    <div className='app'>
    <Router>
      <Header />
      <div className='body'>
        <Navbar />
        <div className='body-main'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/login' exact component={LogIn} />
          </Switch>
        </div>
      </div>
    </Router>

    </div>
  );
}

export default App;
