import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import AvgCubicWeight from './main';
import NotFoundPage from './components/NotFoundPage';

const routes = (
	<Router>
	    <Route path="/" component={AvgCubicWeight} />
	    <Route path="*" component={NotFoundPage} />
	</Router>
);

export default routes;