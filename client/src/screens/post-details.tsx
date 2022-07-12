import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/elements';

// Components
import PostCard from '../components/PostCard';
import ListItem from '../components/ListItem';

const PostDetails = ({ navigation, route }: any) => {
	const {
		uid,
		profileImageURL,
		firstName,
		lastName,
		middleIntial,
		jobTitle,
		description,
		numberOfComments,
		numberOfLikes,
		postLiked,
	} = route.params;

	const renderCommentItem = ({ item }: any) => {
		const {
			uid,
			profileImageURL,
			username,
			response,
			reponsedLiked,
			numberOfLikes,
			navigateToUserProfile,
			handleLikeResponsed
		} = item;

		return(
			<ListItem 
				uid={uid}
				profileImage={profileImageURL}
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
	<HeaderHeightContext.Consumer>
		{(headerHeight: any) => {
			return(
				<>
				<Container style={{  }}>
					<PostCard 
						profileImageURL={profileImageURL}
						firstName={firstName}
						lastName={lastName}
						middleIntial={middleIntial}
						jobTitle={jobTitle}
						description={description}
						numberOfComments={numberOfComments}
						numberOfLikes={numberOfLikes}
						postLiked={postLiked}
						navigateToUserProfile={() => navigation.push('profile', { uid })}
						handleLikePost={() => {}}
						handleCommentOnPost={() => {}}
						style={{ marginTop: headerHeight + 20, borderBottomWidth: 0 }}
					/>
				</Container>
				<Content>
						<FlatList 
							showsVerticalScrollIndicator={false}
							data={null}
							ListFooterComponent={() => {
								return(
									<Text 
										style={{ 
											alignSelf: 'center', 
											color: '#989898', 
											fontSize: 13,
											marginTop: 16,
											marginBottom: 16
										}}>
											Nothing else to see here!
									</Text>
								)
							}}
							renderItem={renderCommentItem}
							keyExtractor={(item: any) => item.uid}
							contentInset={{ bottom: headerHeight }}
						/>
					</Content>
				</>
			)
		}}
	</HeaderHeightContext.Consumer>
  )
};

export default PostDetails;

const Container = styled.View`
  	align-items: center;
`;

const Content = styled.View`
	flex: 1;
`;

const Text = styled.Text``;

const FlatList = styled.FlatList`
	background-color: #e9e9e9;
	padding-top: 8px;
	padding-left: ${20}px;
	padding-right: ${20}px;
`;