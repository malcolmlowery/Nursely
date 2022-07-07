import styled from 'styled-components/native';
import { useState } from 'react';
import { HeaderHeightContext } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';

// Components
import PostCard from '../components/PostCard';

// User posts placeholder data
import fakeData from '../data/fakeData.json';

const Newsfeed = ({ navigation }: any) => {
	const [refreshing, setRefreshing] = useState(false);

	const renderPostItem = ({ item }: any) => {
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
		} = item;

		return(
			<PostCard 
				profileImage={item.profileImage}
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
	};
	
  	return(
		<HeaderHeightContext.Consumer>
			{(headerHeight: any) => {
				return(
					<Container style={{ marginBottom: headerHeight }}>
						<FlatList 
							showsVerticalScrollIndicator={false}
							data={fakeData.response}
							renderItem={renderPostItem}
							keyExtractor={(item: any) => item.uid}
							style={{ overflow: 'visible', top: headerHeight }}
							contentInset={{ top: 0, bottom: 100 }}
							refreshing={refreshing}
							onRefresh={() => {
								setRefreshing(true)
								setTimeout(() => {
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
   background-color: #5F5BFF;
	border-radius: 37px;
	height: 64px;
	justify-content: center;
	width: 64px;
	position: absolute;
`;