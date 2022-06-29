import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import PostCard from '../components/PostCard';

const screenWidth = Dimensions.get('screen').width;

const PostDetails = ({ navigation, route }: any) => {
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
		<ScrollView>
			<Content>
				<Text>Comment Section Here...</Text>
			</Content>
		</ScrollView>
	</Container>
  )
};

export default PostDetails;

const ScrollView = styled.ScrollView`
	width: ${screenWidth - 20}px;
`;

const Container = styled.View`
  	align-items: center;
	background-color: #f8f8f8;
  	flex: 1;
	padding-top: 14px;
`;

const Text = styled.Text`
   font-size: 13px;
`;

const Content = styled.View`

`;