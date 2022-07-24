import styled from 'styled-components/native';
import { useEffect } from 'react';
import { HeaderHeightContext } from '@react-navigation/elements';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../data/store';
import { fetchPost } from '../data/post/post.actions';
import { CommentI, PostI } from '../data/post/post.interface';

// Components
import PostCard from '../components/PostCard/PostCard';
import ListItem from '../components/ListItem';

const PostDetails = ({ navigation, route }: any) => {
	const state = useSelector((state: RootState) => state.post);
	const dispatch = useDispatch<AppDispatch>();
	const { postId	} = route.params;

	useEffect(() => {
		dispatch(fetchPost(postId))
	}, [])

	const {
		// likesIdRef,
		// commentIdRef,
		description,
		numberOfComments,
		numberOfLikes,
		publisher
	}: PostI = state.post;

	const renderCommentItem = ({ item }: any) => {

		const {
			responseId,
			comment,
			displayName,
			jobTitle,
			photoURL
		}: CommentI = item;

		// const {
		// 	uid,
		// 	profileImageURL,
		// 	username,
		// 	response,
		// 	reponsedLiked,
		// 	numberOfLikes,
		// 	navigateToUserProfile,
		// 	handleLikeResponsed
		// } = item;

		return(
			<ListItem 
				// uid={uid}
				profileImage={photoURL}
				username={displayName}
				response={comment}
				reponsedLiked={false}
				numberOfLikes={0}
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
						profileImageURL={publisher?.photoURL}
						displayName={publisher?.displayName}
						jobTitle={publisher?.jobTitle}
						description={description}
						numberOfComments={numberOfComments}
						numberOfLikes={numberOfLikes}
						postLiked={0}
						navigateToUserProfile={() => navigation.push('profile', { uid: publisher.uid })}
						handleLikePost={() => {}}
						handleCommentOnPost={() => {}}
						style={{ marginTop: headerHeight + 20, borderBottomWidth: 0 }}
					/>
				</Container>
				<Content>
						<FlatList 
							showsVerticalScrollIndicator={false}
							data={state.comments}
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