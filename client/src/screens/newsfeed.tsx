import styled from 'styled-components/native';
import { useEffect, useState } from 'react';
import { HeaderHeightContext } from '@react-navigation/elements';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../data/store';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebase.config';
import { fetchPosts, updatePost, deletePost, likePost, createNewComment } from '../data/post/post.actions';

// Components
import PostCard from '../components/PostCard/PostCard';
import { Platform } from 'react-native';

const Newsfeed = ({ navigation }: any) => {
	const posts = useSelector((state: RootState) => state.postSlice.posts);
	const dispatch = useDispatch<AppDispatch>();
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		dispatch(fetchPosts())
	}, [])
	
  	return(
		<HeaderHeightContext.Consumer>
			{(headerHeight: any) => {
				return(
					<>
						<Container style={{ marginBottom: Platform.OS !== 'web' ? headerHeight : 0 }}>
							<FlatList 
								showsVerticalScrollIndicator={false}
								data={posts}
								renderItem={({ item }: any) => {
                           const {
                              postId,
										commentIdRef, 
										likesIdRef,
                              publisher,
                              description,
                              numberOfComments,
                              numberOfLikes,
                              postLiked,
                           } = item;

                           const {
                              uid,
                              photoURL,
                              displayName,
                              jobTitle,
                           } = publisher;
                           
                           return(
                              <PostCard 
                                 profileImageURL={photoURL}
                                 displayName={displayName}
                                 jobTitle={jobTitle}
                                 description={description}
                                 numberOfComments={numberOfComments}
                                 numberOfLikes={numberOfLikes}
                                 postLiked={postLiked}
                                 navigateToUserProfile={() => navigation.push('profile', { uid })}
                                 navigateToPostDetails={() => navigation.push('post-details', {
                                    postId,
                                    photoURL,
                                    displayName,
                                    jobTitle,
                                    description,
                                    numberOfComments,
                                    numberOfLikes,
                                    postLiked,
                                 })}
											isPostOwner={auth.currentUser?.uid === uid ? true : false}
                                 navigateToComments={() => navigation.push('post-details', { postId })}
                                 handleLikePost={() => dispatch(likePost({ postId, likesIdRef }))}
                                 handlePostCommentResponse={(comment) => dispatch(createNewComment({ comment, commentIdRef }))}
											handleUpdatePost={(updatedDescription) => dispatch(updatePost({ description: updatedDescription, postId }))}
											handleDeletePost={() => dispatch(deletePost({ postId, commentIdRef, likesIdRef }))}
                                 style={{ marginBottom: 12 }}
                              />
                           )
                        }}
								keyExtractor={(item: any) => item.postId}
								style={{ top: Platform.OS !== 'web' ? headerHeight : 30, overflow: 'visible' }}
								contentInset={{ bottom: 70, top: 0 }}
								refreshing={refreshing}
								onRefresh={() => {
									setRefreshing(true)
									setTimeout(() => {
										dispatch(fetchPosts())
										setRefreshing(false)
									}, 2000);
								}}
								ListFooterComponent={() => {
									return(
										<Text 
											style={{ 
												alignSelf: 'center', 
												color: '#989898',
												fontSize: 13, 
												marginTop: 16,
												marginBottom: 28
											}}>
												Nothing else to see here!
										</Text>
									)
								}}
							/>
						</Container>
						<CreatePostButton 
                     onPress={() => navigation.push('createPost')} 
                     style={{ bottom: headerHeight + 5, right: 20 }}>
							   <Ionicons name='pencil' color='#fff' size={28} />
						</CreatePostButton>
					</>
				)
			}}
		</HeaderHeightContext.Consumer>
  	)
};

export default Newsfeed;

const Container = styled.View`
  align-items: center;
  justify-content: center;
  top: 20px;
`;

const FlatList = styled.FlatList``;

const Text = styled.Text`
	color: #000;
`;

const CreatePostButton = styled.TouchableOpacity`
   align-items: center;
   box-shadow: 0px 6px 6px rgba(0,0,0,0.15);
   background-color: #3496ff;
	border-radius: 37px;
	height: 64px;
	justify-content: center;
	width: 64px;
	position: absolute;
`;