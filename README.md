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

- Request data

## [react-router-dom](https://ko.reactjs.org/docs/code-splitting.html#route-based-code-splitting)

- React-Router는 3rd party library로 React의 SPA(Single Page Application)구현에 도움
- Route-based code splitting : 앱에 코드를 목적에 맞게 분할하는데도 도움

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

## error

- apollo-link-http
- Module not found: Can't resolve 'graphql/language/printer' in apollo-client
- [solution](https://github.com/apollographql/react-apollo/issues/1274)
