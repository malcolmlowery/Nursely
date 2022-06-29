import styled from 'styled-components/native';
import PostCard from '../components/PostCard';

// User posts placeholder data
import fakeData from '../data/fakeData.json';

const Newsfeed = ({ navigation }: any) => {
  return(
      <ScrollView>
			<Container>
				{ fakeData.response.map((post, index) => {
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
					} = post;
					// React Natives "List" component will be added for rendering and fetching optimizations soon
					return(
						<PostCard 
							key={index}
							profileImage={profileImage}
							firstName={firstName}
							lastName={lastName}
							middleIntial={middleIntial}
							specializtion={specializtion}
							description={description}
							numberOfComments={numberOfComments}
							numberOfLikes={numberOfLikes}
							postLiked={postLiked}
							navigateToUserProfile={() => navigation.push('profile')}
							navigateToPostDetails={() => navigation.push('post-details', {
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
							})}
							navigateToComments={() => navigation.push('post-details')}
							handleLikePost={() => {}}
							handleCommentOnPost={() => {}}
							style={{ marginBottom: 12 }}
						/>
					)
				})}
			</Container>
      </ScrollView>
  )
};

export default Newsfeed;

const ScrollView = styled.ScrollView`
	background-color: #f8f8f8;
	padding-top: 14px;
`;

const Container = styled.View`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;