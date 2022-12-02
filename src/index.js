import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Home from './App';
import Get from './pages/get';
import Create from './pages/create';

ReactDOM.render(
	<Router>
		<div>
			<main>
				<Route exact path='/' component={Home} />
				<Route path='/get' component={Get} />
				<Route path='/create' component={Create} />
			</main>
		</div>
	</Router>,
	document.getElementById('root')
);
