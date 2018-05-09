import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HttpsRedirect from 'react-https-redirect';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter, Route,Switch } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import {createEpicMiddleware} from 'redux-observable';
import 'bootstrap/dist/css/bootstrap.css';


import reducers from './reducers';
import Router from './router';

import rootEpic from './epics';
const epicMiddleware = createEpicMiddleware(rootEpic);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  reducers,
  composeEnhancer(
    applyMiddleware(thunk,middleware,epicMiddleware)
  )
)


ReactDOM.render(
  <Provider store={store}>
     <HttpsRedirect>
    <ConnectedRouter history={history}>
      <Router/>
    </ConnectedRouter>
     </HttpsRedirect>
  </Provider>
  , document.getElementById('root'));
