import React from 'react';
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostCard = ({
	post: { username, body, id, commentCount, likeCount, createdAt },
}) => {
	const likePost = () => {
		console.log('likepost');
	};

	const commentOnPost = () => {
		console.log('comment');
	};

	return (
		<Card fluid as={Link} to={'/'}>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/molly.png"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow(true)}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button as="div" labelPosition="right" onClick={commentOnPost}>
					<Button color="black">
						<Icon name="comments" />
						comment
					</Button>
					<Label basic color="black" pointing="left">
						{commentCount}
					</Label>
				</Button>
				<Button as="div" labelPosition="right" onClick={likePost}>
					<Button color="pink">
						<Icon name="heart" />
						Like
					</Button>
					<Label basic color="pink" pointing="left">
						{likeCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
