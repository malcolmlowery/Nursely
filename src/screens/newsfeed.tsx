import styled from 'styled-components/native';
import { useState } from 'react';
import { HeaderHeightContext } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import PostCard from '../components/PostCard';

// User posts placeholder data
import fakeData from '../data/fakeData.json';

const Newsfeed = ({ navigation }: any) => {
	const tabHeight = useBottomTabBarHeight();

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
	} 
	
  	return(
		<HeaderHeightContext.Consumer>
			{(headerHeight) => {
				console.log(headerHeight)
				return(
					<Container>
						<FlatList 
							showsVerticalScrollIndicator={false}
							data={fakeData.response}
							renderItem={renderPostItem}
							keyExtractor={item => item.uid}
							style={{ top: headerHeight }}
							contentInset={{ bottom: tabHeight + headerHeight + 16 }}
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
											color: '#C8C8C8', 
											marginTop: 16
										}}>
											Nothing else to see here!
									</Text>
								)
							}}
						/>
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
  flex: 1;
`;

const FlatList = styled.FlatList`
	padding-top: 20px;
`;

const Text = styled.Text`
	color: #000;
`;