import React, {PropTypes} from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom'

import APP from './components/App';
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Auth from './components/Auth/Auth'
import Calendar from './components/Calendar/Calendar';

 class Router extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route path='/calendar' component={Calendar}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/' component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default Router;
