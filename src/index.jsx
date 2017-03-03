import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { getAccess } from './actions';
import thunk from 'redux-thunk';
import logMiddleware from './middleware/logMiddleware';
import AppContainer from './containers/AppContainer';
import TestsListContainer from './containers/TestsListContainer';
import TestContainer from './containers/TestContainer';
import { dom } from './config';

import 'classlist-polyfill';
import 'babel-polyfill';
import './styles';

const store = createStore(
  reducers,
  applyMiddleware(thunk, logMiddleware)
);

store.dispatch(getAccess());

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={AppContainer}>
				<IndexRoute component={TestsListContainer} />
				<Route path='/tests/:testId' component={TestContainer} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById(dom.appId)
);