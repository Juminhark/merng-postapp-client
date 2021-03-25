import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { useMutation, gql } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../util/graphql';

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

const DeleteButton = ({ postId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState();

	const [deletePost] = useMutation(DELETE_POST_MUTATION, {
		variables: {
			postId,
		},
		update(cache) {
			setConfirmOpen(false);

			// TODO : remove post from cache
			const data = cache.readQuery({
				query: FETCH_POSTS_QUERY,
			});
			cache.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: {
					getPosts: data.getPosts.filter((p) => p.id !== postId),
				},
			});

			if (callback) callback();
		},
	});
	return (
		<>
			<Button
				as="div"
				color="red"
				floated="right"
				onClick={() => setConfirmOpen(true)}
			>
				<Icon name="trash" style={{ margin: 0 }} />
			</Button>
			<Confirm
				open={confirmOpen}
				onCancel={() => {
					setConfirmOpen(false);
				}}
				onConfirm={deletePost}
			/>
		</>
	);
};

export default DeleteButton;
