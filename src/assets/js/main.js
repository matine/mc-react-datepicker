import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route } from 'react-router';
import { useRouterHistory } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
const history = useRouterHistory(createHashHistory)({ queryKey: false })

import NotFound from './components/NotFound';
import App from './components/App';

/*
	Routes
*/

var routes = (
	<Router history={history}>
		<Route path="/" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
