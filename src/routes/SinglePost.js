import React, { useContext } from 'react';
import { Grid, Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import moment from 'moment';

import { AuthContext } from '../context/auth';

import LikeButton from '../components/LikeButton';

const FETCH_POST_QUERY = gql`
	query($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			createdAt
			comments {
				id
				body
				createdAt
			}
			likes {
				id
				username
			}
		}
	}
`;

const SinglePost = (props) => {
	const { user } = useContext(AuthContext);

	const postId = props.match.params.postId;
	console.log(postId);

	const {
		data: { getPost },
	} = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});

	let postMarkup;

	if (!getPost) {
		postMarkup = <p>Loading post...</p>;
	} else {
		const {
			id,
			body,
			createdAt,
			username,
			comments,
			likes,
			likeCount,
			commentCount,
		} = getPost;

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column with={2}>
						<Image
							src="https://react.semantic-ui.com/images/avatar/large/molly.png"
							size="small"
							float="right"
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description></Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton user={user} post={{ id, likeCount, likes }} />
								<Button
									as="div"
									labelPosition="right"
									onClick={() => console.log('comment op post')}
								>
									<Button basic color="blue">
										<Icon name="comments" />
									</Button>
									<Label basic color="blue" pointing="left">
										{commentCount}
									</Label>
								</Button>
							</Card.Content>
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return <div></div>;
};

export default SinglePost;
