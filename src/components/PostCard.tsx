import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

type PostCardI = {
   profileImage: string | undefined
   firstName: string
   lastName: string
   middleIntial: string | undefined
   specializtion: string | undefined
   description: string
   numberOfComments: number | undefined
   numberOfLikes: number | undefined
   postLiked: boolean
};

const screenWidth = Dimensions.get('screen').width;

const PostCard = ({ 
   profileImage,
   firstName,
   lastName,
   middleIntial,
   specializtion,
   description,
   numberOfComments,
   numberOfLikes,
   postLiked
   }: PostCardI) => {
   return(
      <Container>
         <Header>
            <Btn>
               <UserInfo>
                  <ProfileImage source={{ uri: profileImage }} />
                  <UserName>
                     <Text style={{ color: '#131313', fontWeight: '600', fontSize: 12 }}>{firstName} {middleIntial}. {lastName}</Text>
                     <Text style={{ color: '#8A8A8A', fontWeight: '500', fontSize: 12 }}>{specializtion}</Text>
                  </UserName>
               </UserInfo>
            </Btn>
            <Btn style={{ top: 4 }}>
               <Ionicons name='ios-alert-circle' size={16} color='#B9B9B9' />
            </Btn>
         </Header>
         <Content>
            <Text style={{ color: '#131313', fontSize: 12, lineHeight: 16.95 }}>{description}</Text>
         </Content>
         <ActionButtons>
            <Text style={{ color: '#8A8A8A', fontWeight: '600' }}>{numberOfComments} comments</Text>
            <Text style={{ color: '#D6493E', fontWeight: '600', marginLeft: 12 }}>{numberOfLikes} likes</Text>
            <Spacer />
            <CommentBtn>
               <Text style={{ color: '#fff', fontWeight: '500' }}>comment</Text>
            </CommentBtn>
            <Btn>
               { postLiked === true ?
                  <Ionicons name='heart' size={28} color='#D6493E' /> 
                  :
                  <Ionicons name='heart' size={28} color='#DEDEDE' />
               }
            </Btn>
         </ActionButtons>
      </Container>
   )
};

export default PostCard;

const Container = styled.View`
   width: ${screenWidth - 20}px;
   border-bottom-style: solid;
   border-bottom-color: #E9E9E9;
   border-bottom-width: 1px;
   margin-bottom: 18px;
   padding-bottom: 10px;
`;

const Text = styled.Text`
   font-size: 11px;
`;

const Spacer = styled.View`
   flex: 1;
`;

const Header = styled.View`
   flex-direction: row;
   justify-content: space-between;
`;

const UserInfo = styled.View`
   flex-direction: row;
`;

const ProfileImage = styled.Image`
   border-radius: 18px;
   height: 35px;
   width: 35px;
`;

const UserName = styled.View`
   justify-content: center;
   margin-left: 12px;
`;

const Content = styled.View`
   margin-top: 14px;
`;

const ActionButtons = styled.View`
   align-items: center;
   flex: 1;
   flex-direction: row;
   margin-top: 10px;
`;

const CommentBtn = styled.TouchableOpacity`
   background-color: #5F5BFF;
   border-radius: 14px;
   height: 24px;
   justify-content: center;
   margin-right: 14px;
   padding: 0 32px;
`;

const Btn = styled.TouchableOpacity`
`;