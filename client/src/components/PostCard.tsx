import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface PostCardI {
   profileImageURL: string | undefined
   firstName: string
   lastName: string
   middleIntial: string | undefined
   jobTitle: string | undefined
   description: string
   numberOfComments: number | undefined
   numberOfLikes: number | undefined
   postLiked: boolean | null
   navigateToUserProfile: () => void
   navigateToPostDetails?: () => void
   navigateToComments?: () => void
   handleLikePost: () => void
   handleCommentOnPost: () => void
   handleUpdatePost: (_: string) => void
   style?: any
   isPostOwner: boolean,
   editingPost: boolean
};

const screenWidth = Dimensions.get('screen').width;

const PostCard = ({ 
   profileImageURL,
   firstName,
   lastName,
   middleIntial,
   jobTitle,
   description,
   numberOfComments,
   numberOfLikes,
   postLiked,
   navigateToUserProfile,
   navigateToPostDetails,
   navigateToComments,
   handleLikePost,
   handleCommentOnPost,
   handleUpdatePost,
   style,
   isPostOwner = true,
   }: PostCardI) => {
      const [toggleOptions, setToggleOptions] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [text, setText] = useState(description);

   return(
      <Container style={style}>
         <Header>
            <Btn onPress={navigateToUserProfile}>
               <UserInfo>
                  <ProfileImage source={{ uri: profileImageURL }} />
                  <UserName>
                     <Text style={{ color: '#131313', fontWeight: '600', fontSize: 14 }}>
                        {firstName} 
                        {middleIntial !== undefined ? ` ${middleIntial}. ${lastName}` : ' ' + lastName}
                     </Text>
                     <Text style={{ color: '#8A8A8A', fontWeight: '500', fontSize: 14, marginTop: 1 }}>{jobTitle}</Text>
                  </UserName>
               </UserInfo>
            </Btn>
            {  isPostOwner == true && toggleOptions == false &&
               <Btn onPress={() => setToggleOptions(true)} style={{ top: 8 }}>
                  <Ionicons name='options' size={20} color='#B9B9B9' />
               </Btn>
            }
            { isPostOwner == false &&
               <Btn style={{ top: 8 }}>
                  <Ionicons name='ios-alert-circle' size={20} color='#B9B9B9' />
               </Btn>
            }
            { toggleOptions == true &&
               <EditButtonsContainer>
                  { isEditing == true ?
                     <Btn onPress={() => {
                        setIsEditing(false)
                        setToggleOptions(false)
                     }} style={{ marginRight: 10, width: 42 }}>
                        <Text style={{ alignSelf: 'center', color: '#D6493E' }}>Cancel</Text>
                     </Btn>
                  :
                     <Btn style={{ marginRight: 10, width: 42 }}>
                        <Text style={{ alignSelf: 'center', color: '#D6493E' }}>Delete</Text>
                     </Btn>
                  }
                  <Btn onPress={() => setIsEditing(true)} style={{ width: 40 }}>
                     <Text style={{ alignSelf: 'center' }}>Edit</Text>
                  </Btn>
                  <Btn onPress={() => {
                     setToggleOptions(false)
                     setIsEditing(false)
                  }} style={{ marginLeft: 8 }}>
                     <Ionicons name='options' size={20} color='#B9B9B9' />
                  </Btn>
               </EditButtonsContainer>
            }
         </Header>
         <Content>
            { isEditing == false ?
               <Btn onPress={navigateToPostDetails}>
                  <Text style={{ color: '#272727', fontSize: 14, fontWeight: '400', lineHeight: 20.25 }}>{description}</Text>
               </Btn>
               :
               <TextInput 
                  defaultValue={description}
                  multiline={true} 
                  maxLength={1000} 
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(val) => setText(val)}
                  // onBlur={() => {}}
               />
            }
         </Content>
         <ActionButtons>
            <Btn onPress={navigateToComments}>
               <Text style={{ color: '#8A8A8A', fontWeight: '500' }}>{numberOfComments} comments</Text>
            </Btn>
            <Text style={{ color: '#D6493E', fontWeight: '500', marginLeft: 12 }}>{numberOfLikes} likes</Text>
            <Spacer />
            { isEditing ?
               <CommentBtn onPress={() => {
                  handleUpdatePost(text)
                  setIsEditing(false)
                  setToggleOptions(false)
               }} style={{ backgroundColor: '#4CAF50'}}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: '500' }}>Submit</Text>
               </CommentBtn>
            :
               <CommentBtn onPress={handleCommentOnPost}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: '500' }}>Comment</Text>
               </CommentBtn>
            }
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
   border-bottom-style: solid;
   border-bottom-color: #E9E9E9;
   border-bottom-width: 1px;
   padding-bottom: 10px;
   width: ${screenWidth - 34}px;
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

const EditButtonsContainer = styled.View`
   align-items: center;
   flex-direction: row;
   justify-content: flex-end;
   width: 100px;
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

const TextInput = styled.TextInput`
   background-color: #fcfcfc;
   border-radius: 6px;
   flex: 1;
   line-height: 20.25px;
   max-height: 300px;
   margin-top: 16px;
   padding-bottom: 20px;
   padding-top: 16px;
   padding-left: 20px;
   padding-right: 10px;
   top: -6px;
`;