import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostStateI } from './post.interface';

export const fetchPost = createAsyncThunk(
   'post/fetchPost',
   async (postId: string) => {
      console.log(postId)
      const token = await AsyncStorage.getItem('token');
      const post: PostStateI = await fetch(`http://localhost:5001/nursely-b7c6d/us-central1/api/post?postId=${postId}`, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'GET'
      })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
      
      return post
   }
);