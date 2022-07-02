import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import PostCard from '../components/PostCard';
import CommentItem from '../components/Comment-Item';

const screenWidth = Dimensions.get('screen').width;

const PostDetails = ({ navigation, route }: any) => {
	const tabHeight = useBottomTabBarHeight();
	const {
		uid,
		profileImage,
		firstName,
		lastName,
		middleIntial,
		specializtion,
		description,
		numberOfComments,
		numberOfLikes,
		postLiked,
	} = route.params;

	const renderCommentItem = ({ item }: any) => {
		const {
			uid,
			profileImage,
			username,
			response,
			reponsedLiked,
			numberOfLikes,
			navigateToUserProfile,
			handleLikeResponsed
		} = item;

		return(
			<CommentItem 
				uid={uid}
				profileImage={profileImage}
				username={username}
				response={response}
				reponsedLiked={reponsedLiked}
				numberOfLikes={numberOfLikes}
				navigateToUserProfile={() => {}}
				handleLikeResponsed={() => {}}
			/>
		)
	}; 

  return(
	<Container>
		<PostCard 
			profileImage={profileImage}
			firstName={firstName}
			lastName={lastName}
			middleIntial={middleIntial}
			specializtion={specializtion}
			description={description}
			numberOfComments={numberOfComments}
			numberOfLikes={numberOfLikes}
			postLiked={postLiked}
			navigateToUserProfile={() => navigation.push('profile', { uid })}
			handleLikePost={() => {}}
			handleCommentOnPost={() => {}}
		/>
		<Content>
			<FlatList 
				showsVerticalScrollIndicator={false}
				data={[
					{
						"uid": "0d93r2hfduhfsd9fsud",
						"profileImage": "https://avatars.githubusercontent.com/u/100153203?v=4",
						"username": "Malcolm Lowery",
						"response": "This has been the case where I work as well. Not sure what they are going to do about it. What are we going to do? No one listens anyway",
						"reponsedLiked": false,
						"numberOfLikes": 8
					},
					{
						"uid": "y52y3bt4bt43t",
						"profileImage": "https://avatars.githubusercontent.com/u/100153203?v=4",
						"username": "Malcolm Lowery",
						"response": "This has been the case where I work as well. Not sure what they are going to do about it. What are we going to do? No one listens anyway",
						"reponsedLiked": false,
						"numberOfLikes": 8
					},
					{
						"uid": "673ybb4422b6635b63",
						"profileImage": "https://avatars.githubusercontent.com/u/100153203?v=4",
						"username": "Malcolm Lowery",
						"response": "This has been the case where I work as well. Not sure what they are going to do about it. What are we going to do? No one listens anyway",
						"reponsedLiked": false,
						"numberOfLikes": 8
					},
					{
						"uid": "r23v80u2380v23y98n29m",
						"profileImage": "https://avatars.githubusercontent.com/u/100153203?v=4",
						"username": "Malcolm Lowery",
						"response": "This has been the case where I work as well. Not sure what they are going to do about it. What are we going to do? No one listens anyway",
						"reponsedLiked": false,
						"numberOfLikes": 8
					},
				]}
				renderItem={renderCommentItem}
				keyExtractor={item => item.uid}
				contentInset={{ bottom: tabHeight + 18 }}
			/>
		</Content>
	</Container>
  )
};

export default PostDetails;

const Container = styled.View`
  	align-items: center;
	background-color: #f8f8f8;
  	flex: 1;
	padding-top: 20px;
`;

const Text = styled.Text`
   font-size: 13px;
`;

const Content = styled.View`
	flex: 1
`;

const FlatList = styled.FlatList`
	width: ${screenWidth - 40}px;
	padding-top: 8px;
`;