import React from 'react';
import App from './App';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

// import { HttpLink } from '@apollo/client';

// const link = new HttpLink({
// 	uri: 'http://localhost:5000',
// });

const client = new ApolloClient({
	uri: 'http://localhost:5000',
	cache: new InMemoryCache(),
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
