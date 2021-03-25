import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

const MenuBar = lazy(() => import('./components/MenuBar'));

const Home = lazy(() => import('./routes/Home'));
const Login = lazy(() => import('./routes/Login'));
const Register = lazy(() => import('./routes/Register'));
const SinglePost = lazy(() => import('./routes/SinglePost'));

const App = () => (
	<AuthProvider>
		<Router>
			<Container>
				<Suspense fallback={<div>Loading...</div>}>
					<MenuBar />
					<Switch>
						<Route exact path="/" component={Home} />
						{/* // TODO : user정보가 있으면 제한 */}
						<AuthRoute exact path="/login" component={Login} />
						<AuthRoute exact path="/register" component={Register} />
						<Route exact path="/posts/:postId" component={SinglePost} />
					</Switch>
				</Suspense>
			</Container>
		</Router>
	</AuthProvider>
);

export default App;
