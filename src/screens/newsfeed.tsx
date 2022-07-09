import styled from 'styled-components/native';
import { useEffect, useState } from 'react';
import { HeaderHeightContext } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../data/store';
import { fetchPosts } from '../data/posts.reducer'

// Components
import PostCard from '../components/PostCard';

const Newsfeed = ({ navigation }: any) => {
	const [refreshing, setRefreshing] = useState(false);
	const posts = useSelector((state: RootState) => state.posts.posts);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchPosts())
	}, [])

	console.log(posts)

	const renderPostItem = ({ item }: any) => {
		const {
			postID,
			publisher,
			profileImageURL,
			description,
			numberOfComments,
			numberOfLikes,
			postLiked,
		} = item;

		return(
			<PostCard 
				profileImage={publisher.profileImageURL}
				firstName={publisher.firstName}
				lastName={publisher.lastName}
				middleIntial={publisher.middleIntial}
				specializtion={publisher.jobTitle}
				description={description}
				numberOfComments={numberOfComments}
				numberOfLikes={numberOfLikes}
				postLiked={postLiked}
				navigateToUserProfile={() => navigation.push('profile', { uid: publisher.uid })}
				navigateToPostDetails={() => navigation.push('post-details', {
					postID,
					profileImageURL: publisher.profileImageURL,
					firstName: publisher.firstName,
					lastName: publisher.lastName,
					middleIntial: publisher.middleIntial,
					jobTitle: publisher.jobTitle,
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
	};
	
  	return(
		<HeaderHeightContext.Consumer>
			{(headerHeight: any) => {
				return(
					<Container style={{ marginBottom: headerHeight }}>
						<FlatList 
							showsVerticalScrollIndicator={false}
							data={posts}
							renderItem={renderPostItem}
							keyExtractor={(item: any) => item.postID}
							style={{ overflow: 'visible', top: headerHeight }}
							contentInset={{ top: 0, bottom: 100 }}
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
						<CreatePostButton onPress={() => navigation.push('createPost')} style={{ bottom: headerHeight - 50, right: 20 }}>
							<Ionicons name='pencil' color='#fff' size={28} />
						</CreatePostButton>
					</Container>
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