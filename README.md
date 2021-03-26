# MERNG-PostApp-client

## Reference

- [Classsed - React GraphQL App series](https://www.youtube.com/playlist?list=PLMhAeHCz8S3_pgb-j51QnCEhXNj5oyl8n)

## Stack

- [React](https://ko.reactjs.org/docs/getting-started.html)
  - [create-react-app](https://github.com/facebook/create-react-app)
- [apollo-graphql](https://www.apollographql.com/)
  - [Apollo client(React)-v3](https://www.apollographql.com/docs/react/)
- [semantic-UI React](https://react.semantic-ui.com/)
- [react-router-dom]()

## Init

- [create-react-app](https://github.com/facebook/create-react-app)

```sh
// previously installed 'create-react-app' globally
> npm install -g create-react-app

> npx create-react-app client

> cd client

> yarn start
```

## [Apollo Client - React / JS](https://www.apollographql.com/docs/react/get-started/)

- Installation

```sh
> yarn add  @apollo/client graphql
```

- Create client && Connect client to react

```js
// ApolloProvider.js
import React from 'react';
import App from './App';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:5000',
	cache: new InMemoryCache(),
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
```

```js
// index.js
import ReactDOM from 'react-dom';
import ApolloProvider from './ApolloProvider';

ReactDOM.render(ApolloProvider, document.getElementById('root'));
```

## [react-router-dom](https://reactrouter.com/web/guides/quick-start)

- React-Router는 3rd party library로 React의 SPA(Single Page Application)구현에 도움
- [Route-based code splitting](<(https://ko.reactjs.org/docs/code-splitting.html#route-based-code-splitting)>)
  - 앱에 코드를 목적에 맞게 분할하는데도 도움

```sh
> yarn add react-router-dom
```

```js
// App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const Login = lazy(() => import('./routes/Login'));
const Register = lazy(() => import('./routes/Register'));

const App = () => (
	<Router>
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
			</Switch>
		</Suspense>
	</Router>
);

export default App;
```

## [Semantic UI React](https://react.semantic-ui.com/usage)

- Install

```
>  yarn add semantic-ui-react semantic-ui-css
```

```js
// App.js
import 'semantic-ui-css/semantic.min.css';
import './App.css';

const App = () => (
 ...
);

export default App;
```

## MenuBar

- [react.semantic-ui](https://react.semantic-ui.com/collections/menu/#types-secondary-pointing)

```js
// components/MenuBar.js
import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

const MenuBar = () => {
	const [activeItem, setActiveItem] = useState('home');

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<Menu pointing secondary>
			<Menu.Item
				name="home"
				active={activeItem === 'home'}
				onClick={handleItemClick}
			/>

			<Menu.Item
				name="friends"
				active={activeItem === 'friends'}
				onClick={handleItemClick}
			/>
			<Menu.Menu position="right">
				<Menu.Item
					name="login"
					active={activeItem === 'login'}
					onClick={handleItemClick}
				/>
				<Menu.Item
					name="register"
					active={activeItem === 'register'}
					onClick={handleItemClick}
				/>
			</Menu.Menu>
		</Menu>
	);
};

export default MenuBar;
```

```js
// App.js
import MenuBar from './components/MenuBar';

const App = () => (
	<Router>
		<Suspense fallback={<div>Loading...</div>}>
			<MenuBar />
			...
		</Suspense>
	</Router>
);

export default App;
```

## Request data

```js
// sample
import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
	query GetExchangeRates {
		rates(currency: "USD") {
			currency
			rate
		}
	}
`;

function ExchangeRates() {
	const { loading, error, data } = useQuery(EXCHANGE_RATES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return data.rates.map(({ currency, rate }) => (
		<div key={currency}>
			<p>
				{currency}: {rate}
			</p>
		</div>
	));
}
```

```js
// routes/home.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const FETCH_POSTS_QUERY = gql`
	query getPosts {
		getPosts {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;

const Home = () => {
	const {
		loading,
		error,
		data: { getPosts: posts },
	} = useQuery(FETCH_POSTS_QUERY);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	console.log(posts);

	return (
		<div>
			<h1>Home page</h1>
		</div>
	);
};

export default Home;
```

## Card

## Moment.js

## use Mutations

```js
// example
import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
	mutation AddTodo($type: String!) {
		addTodo(type: $type) {
			id
			type
		}
	}
`;

function AddTodo() {
	let input;
	const [addTodo, { data }] = useMutation(ADD_TODO);

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addTodo({ variables: { type: input.value } });
					input.value = '';
				}}
			>
				<input
					ref={(node) => {
						input = node;
					}}
				/>
				<button type="submit">Add Todo</button>
			</form>
		</div>
	);
}
```

## graphql-error control

- 1. addUser() 실행
- 2. server validate를 통해 errors를 받아오면 setErrors로 담기
- 3. error 보여주기

```js
// routes/Register.js
const Register = (props) => {
	const [errors, setErrors] = useState({});
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(cache, result) {
			console.log(result);
			props.history.push('/');
		},
		onError(err) {
			// 2. server validate를 통해 errors를 받아오면 setErrors
			console.log(err.graphQLErrors[0].extensions.exception.errors);
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	const onSubmit = (e) => {
		e.preventDefault();
		addUser(); // 1. addUser() 실행
	};

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
				<h1>Register</h1>
				<Form.Input
					label="Username"
					placeholder="Username.."
					name="username"
					type="text"
					value={values.username}
					error={errors.username ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="Email"
					placeholder="Email.."
					name="email"
					type="text"
					value={values.email}
					error={errors.email ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="Password"
					placeholder="Password.."
					name="password"
					type="password"
					value={values.password}
					error={errors.password ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="ConfirmPassword"
					placeholder="ConfirmPassword.."
					name="confirmPassword"
					type="password"
					value={values.confirmPassword}
					error={errors.confirmPassword ? true : false}
					onChange={onChange}
				/>
				<Button type="submit" primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Register;
```

## useHooks

- login, register route에서 반복사용되는 (onChange, onSubmit, values)를 useHooks를 사용

```js
// register.js(before)
const [values, setValues] = useState({
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
});

const onChange = (e) => {
	setValues({ ...values, [e.target.name]: e.target.value });
};

const [addUser, { loading }] = useMutation(REGISTER_USER, {
	update(cache, result) {
		console.log(result);
		props.history.push('/');
	},
	onError(err) {
		console.log(err.graphQLErrors[0].extensions.exception.errors);
		setErrors(err.graphQLErrors[0].extensions.exception.errors);
	},
	variables: values,
});

const onSubmit = (e) => {
	e.preventDefault();
	addUser();
};
```

```js
// hooks.js
import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		callback();
	};

	return {
		onChange,
		onSubmit,
		values,
	};
};
```

```js
// register.js
import { useForm } from '../util/hooks';

const { onChange, onSubmit, values } = useForm(registerUser, {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
});

const [addUser, { loading }] = useMutation(REGISTER_USER, {
	update(cache, result) {
		console.log(result);
		props.history.push('/');
	},
	onError(err) {
		console.log(err.graphQLErrors[0].extensions.exception.errors);
		setErrors(err.graphQLErrors[0].extensions.exception.errors);
	},
	variables: values,
});

// const registerUser: arrow function으로 선언할경우
// useForm 안에서 callback함수로 사용될때 선언되지않은 변수로 인식하기때문에
// function으로 선언함으로써 function hoisting(move declaration from bottom to top)

function registerUser() {
	addUser();
}
```

### AuthContext, AuthProvider using useReducer

```js
// context/hooks.js
import React, { useReducer, createContext } from 'react';

const AuthContext = createContext({
	user: null,
	login: (userData) => {},
	logout: () => {},
});

function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				user: null,
			};

		default:
			return state;
	}
}

function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, { user: null });

	function login(userData) {
		dispatch({
			type: 'LOGIN',
			payload: userData,
		});
	}

	function logout() {
		dispatch({ type: 'LOGOUT' });
	}

	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
}

export { AuthContext, AuthProvider };
```

- login, register로 들어온 user정보를 가지고 app의 모든 route에 접근가능하게
- 최상위에서 context로 정보를 공유하게 설정

```js
// App.js
import { AuthProvider } from './context/auth';

const App = () => <AuthProvider>...</AuthProvider>;

export default App;
```

-login

```js
// Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';

const Login = (props) => {
	const context = useContext(AuthContext);

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			// TODO : LOGIN정보 CONTEXT로
			context.login(userData);
			// TODO : home으로
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});
};
```

- register

```js
// Register.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';

const Register = (props) => {
  const context = useContext(AuthContext);


 const [addUser, { loading }] = useMutation(REGISTER_USER, {
  update(_, { data: { register: userData }}) {
  // TODO : REGISTER정보 CONTEXT로
  context.login(userData);
 // TODO : home으로
  props.history.push('/');
  },
  onError(err) {
    setErrors(err.graphQLErrors[0].extensions.exception.errors);
  },
  variables: values,
 });

```

- MenuBar

```js
import  { useContext } from 'react';
import { AuthContext } from '../context/auth';

const MenuBar = () => {
 const { user, logout } = useContext(AuthContext);

 const menuBar = user ? (
  // user정보가 있을때
  <Menu pointing secondary size="massive" color="pink">
   <Menu.Item name={user.username} active as={Link} to="/" />

   <Menu.Menu position="right">
    <Menu.Item name="logout" onClick={logout} />
   </Menu.Menu>
  </Menu>
 ) : (
  // user정보가 없을때
  ...
 );

 return menuBar;
};

export default MenuBar;
```

### [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

- web 데이터 저장하는 방법중 server가 아닌 client 영역에서 가능한 방법들이 있다
- login, register등 사용자의 정보가 페이지에 저장되었을때,
- 페이지간 이동(uri의 변화)에 저장된 정보를 공유해야하는 상황이 있다.
  - [JSP 영역(Scope) 객체와 속성 (page, request, session, application)](https://blog.naver.com/javaking75/140181686711)
  - [web/api//window/localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)
- 이미 저장된 user 정보의 만료확인, 만료되지않은 token을 가졌으면 login, register 불필요

### Add Posts

- [networking-authentication](https://www.apollographql.com/docs/react/networking/authentication/)

- [api-link : context link](https://www.apollographql.com/docs/react/api/link/apollo-link-context/)

- [caching - Rerunning queries after a mutation](https://www.apollographql.com/docs/react/caching/advanced-topics/)

- [update cache afer a mutation](https://www.youtube.com/watch?v=lQ7t20gFR14)

### server connect

```js
// package.json
{
 ... ,
 "proxy": "https://merng-postapp-server.herokuapp.com/"
}

// ApolloProvider.js
const httpLink = new createHttpLink({
 uri: 'https://merng-postapp-server.herokuapp.com/',
});
```

# error

### 1. apollo-link-http

- Module not found: Can't resolve 'graphql/language/printer' in apollo-client
- [solution](https://github.com/apollographql/react-apollo/issues/1274)

### [Hoistiong](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)
