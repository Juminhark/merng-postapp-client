import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';

const Home = lazy(() => import('./routes/Home'));
const Login = lazy(() => import('./routes/Login'));
const Register = lazy(() => import('./routes/Register'));

const App = () => (
	<Router>
		<Container>
			<Suspense fallback={<div>Loading...</div>}>
				<MenuBar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</Switch>
			</Suspense>
		</Container>
	</Router>
);

export default App;
