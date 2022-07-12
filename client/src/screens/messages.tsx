import styled from 'styled-components/native';
import { HeaderHeightContext } from '@react-navigation/elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { useState } from 'react';

const screenWidth = Dimensions.get('screen').width;

const fakeNotifications = {
	"response": [
		{
			"messageId": "e138eg9u1fu3f",
			"profileImageURL": "https://www.staffcare.com/siteassets/blogs/advice-and-insights/trends-affecting-physician-jobs.jpg",
			"username": "Linda Sollis",
			"response": "Hi friend!!!",
		},
		{
			"messageId": "02302178781",
			"profileImageURL": "https://www.staffcare.com/siteassets/blogs/advice-and-insights/trends-affecting-physician-jobs.jpg",
			"username": "Larry Bird",
			"response": "Whats up?"
		}
	]
};

const Messages = ({ navigation }: any) => {
	const [refreshing, setRefreshing] = useState(false);
	return(
		<HeaderHeightContext.Consumer>
         {(headerHeight: any) => {
				return(
					<SafeAreaProvider style={{ flex: 1, marginBottom: headerHeight * 1.75, top: headerHeight }}>
						<Container>
							<FlatList 
								data={fakeNotifications.response}
								renderItem={({ item }: any) => {
									const {
										messageId,
										profileImageURL,
										username,
										response,
									} = item;
								
									const textLimiter = () => {
										if(response.length > 60) {
											return response.substr(0, 60) + '...'
										}
										return response
									};

									return(
										<Button onPress={() => navigation.navigate('message', { messageId })}>
											<GroupItem>
												<GroupItemHeader>
													<ProfileImage source={{ uri: profileImageURL }} />
													<Text style={{ fontSize: 13, fontWeight: '500', marginLeft: 10 }}>{username}</Text>
												</GroupItemHeader>
												<Text style={{ color: '#5F5BFF', marginLeft: 38, fontSize: 13, lineHeight: 18.25 }}>Response: {textLimiter()}</Text>
											</GroupItem>
											<Divider />
										</Button>
									)
								}}
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
											}}>
												No more messages!
										</Text>
									)
								}}
							/>
						</Container>
					</SafeAreaProvider>
				)
			}}
		</HeaderHeightContext.Consumer>
	)
};

export default Messages;

const Container = styled.View`
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: center;
	padding-top: 10px;
`;

const FlatList = styled.FlatList`
	width: ${screenWidth - 20}px;
	overflow: visible;
`;

const Text = styled.Text``;

const GroupItem = styled.View`
	margin-top: 10px;
`;

const GroupItemHeader = styled.View`
	align-items: center;
	flex-direction: row;
`;

const Button = styled.TouchableOpacity``;

const ProfileImage = styled.Image`
	border-radius: 16px;
	height: 28px;
	width: 28px;
`;

const Divider = styled.View`
   border-bottom-style: solid;
   border-bottom-color: #E9E9E9;
   border-bottom-width: 1px;
   padding-bottom: 10px;
   width: ${screenWidth - 34}px;
`;