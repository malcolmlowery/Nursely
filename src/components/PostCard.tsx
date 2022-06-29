import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

type PostCardI = {
   profileImage: string | undefined
   firstName: string
   lastName: string
   middleIntial: string | null
   specializtion: string | undefined
   description: string
   numberOfComments: number | undefined
   numberOfLikes: number | undefined
   postLiked: boolean | null
   navigateToUserProfile: () => void
   navigateToPostDetails: () => void
   navigateToComments: () => void
   handleLikePost: () => void
   handleCommentOnPost: () => void
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
   postLiked,
   navigateToUserProfile,
   navigateToPostDetails,
   navigateToComments,
   handleLikePost,
   handleCommentOnPost
   }: PostCardI) => {
   return(
      <Container>
         <Header>
            <Btn onPress={navigateToUserProfile}>
               <UserInfo>
                  <ProfileImage source={{ uri: profileImage }} />
                  <UserName>
                     <Text style={{ color: '#131313', fontWeight: '600', fontSize: 14 }}>
                        {firstName} 
                        {middleIntial !== null ? ` ${middleIntial}. ${lastName}` : ' ' + lastName}
                     </Text>
                     <Text style={{ color: '#8A8A8A', fontWeight: '500', fontSize: 14 }}>{specializtion}</Text>
                  </UserName>
               </UserInfo>
            </Btn>
            <Btn>
               <Ionicons name='ios-alert-circle' size={20} color='#B9B9B9' />
            </Btn>
         </Header>
         <Content>
            <Btn onPress={navigateToPostDetails}>
               <Text style={{ color: '#272727', fontSize: 14, fontWeight: '400', lineHeight: 20.25 }}>{description}</Text>
            </Btn>
         </Content>
         <ActionButtons>
            <Btn onPress={navigateToComments}>
               <Text style={{ color: '#8A8A8A', fontWeight: '500' }}>{numberOfComments} comments</Text>
            </Btn>
            <Text style={{ color: '#D6493E', fontWeight: '500', marginLeft: 12 }}>{numberOfLikes} likes</Text>
            <Spacer />
            <CommentBtn onPress={handleCommentOnPost}>
               <Text style={{ color: '#fff', fontSize: 12, fontWeight: '500' }}>Comment</Text>
            </CommentBtn>
            <Btn onPress={handleLikePost}>
               { postLiked === true ?
                  <Ionicons name='heart' size={38} color='#D6493E' /> 
                  :
                  <Ionicons name='heart' size={38} color='#DEDEDE' />
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
   font-size: 13px;
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
   border-radius: 20px;
   height: 40px;
   width: 40px;
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
   border-radius: 16px;
   height: 32px;
   justify-content: center;
   margin-right: 14px;
   padding: 0 32px;
`;

const Btn = styled.TouchableOpacity`
`;