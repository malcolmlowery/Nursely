import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../data/store';
import { loginUser } from '../data/user/user.actions';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
 
const Login = ({ navigation }: any) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch<AppDispatch>();

   return(
      <Container>
         <LinearGradient
            colors={["#5F5BFF", "#312fb4"]}
            style={{ 
               flex: 1, 
               height: screenHeight,
               position: 'absolute', 
               width: screenWidth
            }}
         />
         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ alignItems: 'center' }}>
            <Text style={{ color: '#fff', marginBottom: 30, fontSize: 52, fontWeight: '600'}}>Nursely</Text>
            <Content>
               <Text style={{ color: '#252525', fontSize: 30, fontWeight: '600'}}>Login</Text>

               <InputGroup style={{ marginTop: 20 }}>
                  <Ionicons name='mail' color='#d8d8d8' size={32} />
                  <TextInput placeholder='email' value={email} onChangeText={(val) => setEmail(val)} />
               </InputGroup>

               <InputGroup style={{ marginTop: 12 }}>
                  <Ionicons name='lock-closed' color='#d8d8d8' size={32} />
                  <TextInput 
                     style={{ bottom: -2 }} 
                     placeholder='password' 
                     secureTextEntry={true} 
                     value={password} 
                     onChangeText={(val) => setPassword(val)}
                  />
               </InputGroup>

               <Button 
                  style={{ marginTop: 30, padding: 14 }} 
                  onPress={() => signInWithEmailAndPassword(auth, email, password).catch(error => console.log(error))}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>Submit</Text>
               </Button>
               
               <Button onPress={() => navigation.push('sign-up')} style={{ backgroundColor: 'transparent', marginTop: 20, padding: 6 }}>
                  <Text>Need an account?</Text>
               </Button>
            </Content>
         </KeyboardAvoidingView>
      </Container>
   )
};

export default Login;

const Container = styled.View`
   align-items: center;
   justify-content: center;
   flex: 1;
`;

const Content = styled.View`
   background: #fff;
   border-radius: 30px;
   padding: 26px;
   width: ${Platform.OS === 'web' ? 300 : screenWidth - 40}px;
`;

const InputGroup = styled.View`
   border-bottom-style: solid;
   border-bottom-color: #E9E9E9;
   border-bottom-width: 1px;
   flex-direction: row;
   padding-bottom: 8px;
   `;

const TextInput = styled.TextInput`
   color: #303030;
   font-weight: 500;
   margin-left: 6px;
   flex: 1;
`;

const Text = styled.Text`
   color: #252525;
`;

const Button = styled.TouchableOpacity`
   align-self: center;
   align-items: center;
   background-color: #5F5BFF;
   border-radius: 30px;
   width: 220px;
`;