import React, {PropTypes} from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom'

import APP from './components/App';

 class Router extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path='/' component={APP}/>
        </Switch>
      </div>
    );
  }
}

export default Router;
