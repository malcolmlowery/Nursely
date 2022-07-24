import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, signInWithCustomToken, signInWithEmailAndPassword } from '../../../firebase.config';

export const createUser = createAsyncThunk(
   'user/createUser',
   async (userInput) => {
      // Placeholder data until signup screen is created
      const userData = {
         firstName: 'Malcolm',
         lastName: 'Lowery',
         email: 'malcolmlowery.developer@gmail.com',
         password: '123456',
         photoURL: 'https://avatars.githubusercontent.com/u/100153203?v=4',
         jobTitle: 'Registered Nurse',
         specializations: ['Oncology', 'Pediatrics', 'Anesthesiology'],
         hospitalName: 'Delray Medical Center'
      }

      const {
         token,
         displayName,
         photoURL,
         occupation
      } = await fetch('http://localhost:5001/nursely-b7c6d/us-central1/api/user', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(userData)
      })
      .then(response => response.json())

      await signInWithCustomToken(auth, token)
         .then(async ({ user }) => {
            const userToken = await user.getIdToken(true);
            console.log(userToken)
            await AsyncStorage.setItem('token', userToken)
         })
         .catch(error => console.log(error))
   }
);

export const loginUser = createAsyncThunk(
   'user/login',
   async ({email, password}: any) => {

      const user: any = await signInWithEmailAndPassword(auth, email, password)
         .then(({ user }) => user)
         .catch(error => console.log(error))

      await auth.currentUser?.getIdToken(true)
      .then(async (token) => {
         await AsyncStorage.setItem('token', token)
      })
   }
);