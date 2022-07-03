import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { useState } from 'react';

const screenWidth = Dimensions.get('screen').width;

const fakeNotifications = {
	"response": [
		{
			"commentId": "fh29fg2gg",
			"profileImageURL": "https://www.staffcare.com/siteassets/blogs/advice-and-insights/trends-affecting-physician-jobs.jpg",
			"username": "Jake Royce",
			"response": "Wow!!!",
		},
		{
			"commentId": "4t2g2v22t",
			"profileImageURL": "https://www.staffcare.com/siteassets/blogs/advice-and-insights/trends-affecting-physician-jobs.jpg",
			"username": "Jake Royce",
			"response": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia",
		},
		{
			"commentId": "7858n4u53424",
			"profileImageURL": "https://media.istockphoto.com/photos/confident-medical-student-wearing-medical-scrubs-picture-id1309503232?b=1&k=20&m=1309503232&s=170667a&w=0&h=_jd0bJlaRdJdwBY8bsaP_4-vtjX2Sm2N8v9BXBydbbU=",
			"username": "Ebony K. Cannon",
			"likedPosted": true
		},
		{
			"commentId": "34fhh29hh89",
			"profileImageURL": "https://www.staffcare.com/siteassets/blogs/advice-and-insights/trends-affecting-physician-jobs.jpg",
			"username": "Jake Royce",
			"likedPosted": true
		},
	]
}


const renderItem = ({ item }: any) => {
	const {
		commentId,
		profileImageURL,
		username,
		response
	} = item;

	const textLimiter = () => {
		if(response.length > 60) {
			return response.substr(0, 60) + '...'
		}
		return response
	};

  	return(
		response ? 
		<Button key={commentId}>
			<GroupItem>
				<GroupItemHeader>
					<ProfileImage source={{ uri: profileImageURL }} />
					<Text style={{ fontSize: 13, fontWeight: '500', marginLeft: 10 }}>{username} commented on your post.</Text>
				</GroupItemHeader>
				<Text style={{ color: '#5F5BFF', marginLeft: 38, fontSize: 13, lineHeight: 18.25 }}>Response: {textLimiter()}</Text>
			</GroupItem>
			<Divider />
	 	</Button>
		:
		<Button>
			<GroupItem>
				<GroupItemHeader>
					<ProfileImage source={{ uri: profileImageURL }} />
					<Text style={{ fontSize: 13, fontWeight: '500', marginLeft: 10 }}>{username} liked on your post.</Text>
				</GroupItemHeader>
			</GroupItem>
			<Divider />
	 	</Button>
  	)
};

const Notifications = () => {
	const [refreshing, setRefreshing] = useState(false);
	return(
		<Container>
			<FlatList 
				data={fakeNotifications.response}
				renderItem={renderItem}
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
								marginTop: 16,
							}}>
								Nothing else to see here!
						</Text>
					)
				}}
			/>
		</Container>
	)
};

export default Notifications;

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