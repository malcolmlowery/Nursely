import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, signInWithCustomToken, signInWithEmailAndPassword } from '../../../firebase.config';

export const createUser = createAsyncThunk(
   'user/createUser',
   async (userInput) => {
      // Placeholder data until signup screen is created
      const userData = {
         firstName: 'Sarah',
         lastName: 'Finley',
         email: 'test@gmail.com',
         password: '123456',
         photoURL: 'https://media.istockphoto.com/photos/portrait-of-female-nurse-using-tablet-at-hospital-picture-id1198224204?k=20&m=1198224204&s=612x612&w=0&h=y7KmFTJZ9JOya_1FQzst4oatxLux5Htr1QEmeVM396s=',
         jobTitle: 'Registered Nurse',
         specializations: ['Oncology', 'Pediatrics', 'Anesthesiology'],
         hospitalName: 'Delray Medical Center'
      }

      const {
         token,
         displayName,
         photoURL,
         occupation
      } = await fetch('https://us-central1-nursely-b7c6d.cloudfunctions.net/api/user', {
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
   async ({ email, password }: any) => {
      console.log('s')
      await signInWithEmailAndPassword(auth, email, password)
         .then(({ user }) => user)
         .catch(error => console.log(error))

      await auth.currentUser?.getIdToken(true)
         .then(async (token) => {
            await AsyncStorage.setItem('token', token)
         })
         .catch(error => console.log(error))
   }
);

// const userData = {
//    firstName: 'Sarah',
//    lastName: 'Downy',
//    email: 'Sarah.developer@gmail.com',
//    password: '123456',
//    photoURL: 'https://media.istockphoto.com/photos/confident-medical-student-wearing-medical-scrubs-picture-id1309503232?b=1&k=20&m=1309503232&s=170667a&w=0&h=_jd0bJlaRdJdwBY8bsaP_4-vtjX2Sm2N8v9BXBydbbU=',
//    jobTitle: 'Pediatrician',
//    specializations: ['Oncology', 'Pediatrics', 'Anesthesiology'],
//    hospitalName: 'Delray Medical Center'
// }