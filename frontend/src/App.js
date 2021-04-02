import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import OligoList from './components/oligos/OligoList';
import OligoDetails from './components/oligos/OligoDetails';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import './App.css';
import { loadUser } from './actions/auth';
import store from './store';
import history from './history';


function App(props) {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <div className='app'>
        <Router history={history}>
          <Header />
          <div className='body' {...props}>
            <Navbar />
            <div className='body-main'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/register' exact component={RegisterForm} />
                <Route path='/login' exact component={LoginForm} />
                <Route path='/oligos' component={OligoList} />
                <Route path='/oligo_details/:id' component={OligoDetails} />
              </Switch>
            </div>
          </div>
        </Router>
        <div className='footer'>
          <p>Receptor 2021 by Thomas Oh and Abeer Eltanawy</p>
        </div>
      </div>
    </Provider>
  );
}

export default App;

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.token !== null
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
