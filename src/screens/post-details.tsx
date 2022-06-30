import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import PostCard from '../components/PostCard';
import CommentItem from '../components/Comment-Item';

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
		<ScrollView showsVerticalScrollIndicator={false}>
			<Content>
				<CommentItem 
					uid='0d93r2hfduhfsd9fsud'
					profileImage='https://avatars.githubusercontent.com/u/100153203?v=4'
					username='Malcolm Lowery'
					response='This has been the case where I work as well. Not sure what they are going to do about it. What are we going to do? No one listens anyway'
					reponsedLiked={false}
					numberOfLikes={8}
					navigateToUserProfile={() => {}}
					handleLikeResponsed={() => {}}
				/>
				<CommentItem 
					uid='42384892fh2fh2f9h2'
					profileImage='https://explorehealthcareers.org/wp-content/uploads/2016/11/licensed_practical_nurse.jpg'
					username='Tahsa Evans'
					response='I am seriously considering changing careers and starting a 2 yr program through a community college to obtain my ADN and then to get certified as an RN.'
					reponsedLiked={false}
					numberOfLikes={0}
					navigateToUserProfile={() => {}}
					handleLikeResponsed={() => {}}
				/>
				<CommentItem 
					uid='c89fy297g3rf92f92f39'
					profileImage='https://www.elsevier.com/__data/assets/image/0020/1254521/NurseHeader2.png'
					username='Issac T. Thorn'
					response='I am a new nurse working nights on a telemetry/psych floor.'
					reponsedLiked={true}
					numberOfLikes={1}
					navigateToUserProfile={() => {}}
					handleLikeResponsed={() => {}}
				/>
			</Content>
		</ScrollView>
	</Container>
  )
};

export default PostDetails;

const ScrollView = styled.ScrollView`
	width: ${screenWidth - 40}px;
	padding-top: 10px;
`;

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

`;