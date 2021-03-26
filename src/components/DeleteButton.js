import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { useMutation, gql } from '@apollo/client';

import MyPopup from '../util/MyPopup';

import { FETCH_POSTS_QUERY } from '../util/graphql';

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
			comments {
				id
				username
			}
		}
	}
`;

const DeleteButton = ({ postId, commentId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState();

	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

	const [deletePostOrMutation] = useMutation(mutation, {
		variables: {
			postId,
			commentId,
		},
		update(cache) {
			setConfirmOpen(false);

			if (!commentId) {
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
			}

			if (callback) callback();
		},
	});
	return (
		<>
			<MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
				<Button
					as="div"
					color="red"
					floated="right"
					onClick={() => setConfirmOpen(true)}
				>
					<Icon name="trash" style={{ margin: 0 }} />
				</Button>
			</MyPopup>

			<Confirm
				open={confirmOpen}
				onCancel={() => {
					setConfirmOpen(false);
				}}
				onConfirm={deletePostOrMutation}
			/>
		</>
	);
};

export default DeleteButton;
