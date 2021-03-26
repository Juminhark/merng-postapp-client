import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import { useForm } from '../util/hooks';

import { FETCH_POSTS_QUERY } from '../util/graphql';

const CREATE_POST_MUTATION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			username
			likes {
				id
				username
				createdAt
			}
			likeCount
			comments {
				id
				body
				username
				createdAt
			}
			commentCount
		}
	}
`;

function PostForm() {
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		body: '',
	});

	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(cache, result) {
			// TODO : add post from cache
			const data = cache.readQuery({
				query: FETCH_POSTS_QUERY,
			});
			cache.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: {
					getPosts: [result.data.createPost, ...data.getPosts],
				},
			});
			values.body = '';
		},
		onError(err) {
			console.log(err);
		},
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Create a post:</h2>
				<Form.Field>
					<Form.Input
						placeholder="hi world"
						name="body"
						onChange={onChange}
						value={values.body}
						error={error ? true : false}
					/>
					<Button type="submit" color="pink">
						Submit
					</Button>
				</Form.Field>
			</Form>
			{error && (
				<div className="ui error message" style={{ marginBottom: 20 }}>
					<ul className="list">
						<li>{error.graphQLErrors[0].message}</li>
					</ul>
				</div>
			)}
		</>
	);
}

export default PostForm;
