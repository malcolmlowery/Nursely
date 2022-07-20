import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
   'posts/fetchPosts',
   async () => {
      const token = await AsyncStorage.getItem('token')
      return (await fetch('http://localhost:5001/nursely-b7c6d/us-central1/api/posts', {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'GET'
      })
      .then(response => response.json()))
   }
);

export const createPost = createAsyncThunk(
   'posts/createPost',
   async (description: string) => {
      const token = await AsyncStorage.getItem('token')
      return (await fetch('http://localhost:5001/nursely-b7c6d/us-central1/api/posts', {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'POST',
         body: JSON.stringify({ description }),
      })
      .then(response => response.json()))
   }
);

export const updatePost = createAsyncThunk(
   'posts/updatePost',
   async ({ postID, description }: any) => {
      const token = await AsyncStorage.getItem('token')
      return (await fetch(`http://localhost:5001/nursely-b7c6d/us-central1/api/posts/post?postID=${postID}`, {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'PUT',
         body: JSON.stringify({ description })
      })
      .then(response => response.json()))
   }
);

export const deletePost = createAsyncThunk(
   'posts/deletePost',
   async (postID: string) => {
      const token = await AsyncStorage.getItem('token')
      return (await fetch(`http://localhost:5001/nursely-b7c6d/us-central1/api/posts/post?postID=${postID}`, {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'DELETE',
      })
      .then(response => response.json()))
   }
);

export const likePost = createAsyncThunk(
   'posts/likePost',
   async (postID: string) => {
      const token = await AsyncStorage.getItem('token')
      return (await fetch(`http://localhost:5001/nursely-b7c6d/us-central1/api/likes?postID=${postID}`, {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'POST'
      })
      .then(response => response.json()))
   }
);

export const postCommentResponse = createAsyncThunk(
   'posts/comments',
   async ({comment, postID}: any) => {
      const token = await AsyncStorage.getItem('token')
      const data = await fetch(`http://localhost:5001/nursely-b7c6d/us-central1/api/comments`, {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'POST',
         body: JSON.stringify({ comment, postID })
      })
      .then(response => response.json())

      return console.log(data)
   }
);

// Fetchs a single post and returns with all user comments
export const fetchPost = createAsyncThunk(
   'posts/getPost',
   async (postID) => {
      const token = await AsyncStorage.getItem('token')
      return (await fetch(`http://localhost:5001/nursely-b7c6d/us-central1/api/posts/post?postID=${postID}`, {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'GET',
      })
      .then(response => response.json()))
   }
);