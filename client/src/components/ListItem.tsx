import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

interface ListItemI {
   uid: string
   profileImage: string
   username: string
   response: string
   reponsedLiked: boolean
   numberOfLikes: number
   navigateToUserProfile: () => void
   handleLikeResponsed: () => void
};

const ListItem = ({
   uid,
   profileImage,
   username,
   response,
   reponsedLiked,
   numberOfLikes,
   navigateToUserProfile,
   handleLikeResponsed
   }: ListItemI) => {
   return(
      <Container>
         <Header>
            <Btn style={{ alignItems: 'center', flexDirection: 'row' }} onPress={navigateToUserProfile}>
               <ProfileImage source={{ uri: profileImage }} />
               <Text style={{ fontWeight: '500', marginLeft: 10 }}>{username}</Text>
            </Btn>
            <Spacer />
            {/* <Btn>
               <Ionicons style={{ marginRight: 8 }} name='ios-alert-circle' size={20} color='#dedede' />
            </Btn> */}
         </Header>
         <Content>
            <Text style={{ color: '#272727' }}>{response}</Text>
         </Content>
         <ActionButtons>
            <Spacer />
            <Text style={{ color: '#D6493E', marginRight: 12 }}>likes {numberOfLikes}</Text>
            <Btn style={{ marginRight: 4 }} onPress={handleLikeResponsed}>
               { reponsedLiked === true ?
                  <Ionicons name='heart' size={28} color='#D6493E' /> 
                  :
                  <Ionicons name='heart' size={28} color='#DEDEDE' />
               }
            </Btn>
         </ActionButtons>
      </Container>
   )
};

export default ListItem;

const Container = styled.View`
   border-bottom-style: solid;
   border-bottom-color: #dedede;
   border-bottom-width: 1px;
   padding-top: 10px;
   padding-bottom: 10px;
`;

const Header = styled.View`
   align-items: center;
   flex-direction: row;
`;

const ProfileImage = styled.Image`
   border-radius: 14px;
   height: 28px;
   width: 28px;
`;

const Text = styled.Text`
   color: #131313;
   line-height: 20.25px;
`;

const Spacer = styled.View`
   flex: 1;
`;

const Content = styled.View`
   margin-top: 10px;
`;

const ActionButtons = styled.View`
   align-items: center;
   flex-direction: row;
`;

const Btn = styled.TouchableOpacity`
`;