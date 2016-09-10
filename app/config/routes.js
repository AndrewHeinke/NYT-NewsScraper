var React = require('react');

var Router = require('react-router');
var Route = Router.Route;

var IndexRoute = Router.IndexRoute;

var Main = require('../components/main.js');
var Search = require('../components/search.js');
var Saved = require('../components/saved.js');

module.exports = (
	<Route path='/' component={Main}>
		<Route path='Search' component={Search} />
		<Route path='Saved' component={Saved} />
		<IndexRoute component={Search} />
	</Route>
);
