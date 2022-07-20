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
         password: '123456'
      }

      const { data } = await fetch('http://localhost:5001/nursely-b7c6d/us-central1/api/users', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(userData)
      })
      .then(response => response.json())

      await signInWithCustomToken(auth, data.userToken)
         .catch(error => console.log(error))

      await auth.currentUser?.getIdToken(true)
         .then(async (idToken) => {
            await AsyncStorage.setItem('token', idToken)
         })
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