import styled from 'styled-components/native';
import { Dimensions, Keyboard } from 'react-native';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';

interface CreatePostI {
   navigation: any
   text: string
};

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const CreatePost = ({ navigation }: CreatePostI) => {
   const [isUploadingPost, setIsUploadingPost] = useState(false);
   const [keyboardStatus, setKeyboardStatus] = useState(undefined);

   return(
      <Container>
         <BlurView tint='light' intensity={50} style={{ 
            flex: 1, 
            height: screenHeight,
            position: 'absolute', 
            width: screenWidth
         }} 
         />
         <Content>
            <Card>
               { isUploadingPost &&
                  <BlurView tint='light' intensity={15} style={{ 
                     flex: 1, 
                     height: 320,
                     width: screenWidth - 60,
                     borderRadius: 20,
                     overflow: 'hidden',
                     position: 'absolute',
                     zIndex: 10001
                  }} 
                  />
               }
               <Header>
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>What's on your mind?</Text>
               </Header>
               <TextInput 
                  placeholder='Say something...' 
                  multiline={true} 
                  maxLength={1000} 
                  enablesReturnKeyAutomatically={true}
                  onBlur={({ nativeEvent }) => {
                     console.log(nativeEvent.target)
                  }}
               />
               <ActionButtons>
                  <Button onPress={() => navigation.pop()}>
                     <Text style={{ color: '#D6493E', fontWeight: '500', fontSize: 16 }}>Cancel</Text>
                  </Button>
                  <Button onPress={() => {
                     setIsUploadingPost(true)
                     setTimeout(() => {
                        setIsUploadingPost(false)
                        navigation.pop()
                     }, 2000)
                  }}>
                     <Text style={{ color: '#2c7eea', fontWeight: '500', fontSize: 16 }}>Post</Text>
                  </Button>
               </ActionButtons>
            </Card>
         </Content>
      </Container>
   )
};

export default CreatePost;

const Container = styled.View`
   flex: 1;
`;

const Content = styled.View`
   align-items: center;
   flex: 1;
   justify-content: center;
`;

const Card = styled.View`
   background-color: #fff;
   box-shadow: 0px 12px 24px rgba(0,0,0,0.10);
   border-radius: 20px;
   height: 320px;
   padding: 10px;
   padding-left: 20px;
   padding-right: 20px;
   width: ${screenWidth - 60}px;
`;

const Header = styled.View`
   margin-bottom: 10px;
   padding-top: 10px;
   width: 100%;
`;

const TextInput = styled.TextInput`
   flex: 1;
   padding-bottom: 10px;
`;

const ActionButtons = styled.View`
   margin-top: 20px;
   margin-bottom: 10px;
   justify-content: space-around;
   flex-direction: row;
   width: 100%;
`;

const Button = styled.TouchableOpacity`

`;

const Text = styled.Text`

`;