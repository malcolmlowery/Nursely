import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostI, PostStateI } from './post.interface';

// GET all user posts
export const fetchPosts = createAsyncThunk(
   'posts/fetchPosts',
   async () => {
      const token = await AsyncStorage.getItem('token')
      const posts: PostI[] = await fetch('https://us-central1-nursely-b7c6d.cloudfunctions.net/api/posts', {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'GET',
      })
      .then(response => response.json())
      .then(data => data)
      .catch((error) => console.log(error))

      return posts
   }
);

// GET a single user post
export const fetchPost = createAsyncThunk(
   'post/fetchPost',
   async (postId: string) => {
      console.log(postId)
      const token = await AsyncStorage.getItem('token');
      const post: PostStateI = await fetch(`https://us-central1-nursely-b7c6d.cloudfunctions.net/api/post?postId=${postId}`, {
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

// CREATE a single user post
export const createPost = createAsyncThunk(
   'post/createPost',
   async (description: string) => {
      const token = await AsyncStorage.getItem('token');
      const post: PostI = await fetch('https://us-central1-nursely-b7c6d.cloudfunctions.net/api/post', {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'POST',
         body: JSON.stringify({ description }),
      })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error));

      return post
   }
);

// UPDATE a single user post
export const updatePost = createAsyncThunk(
   'posts/updatePost',
   async ({ postId, description }: any) => {
      const token = await AsyncStorage.getItem('token')
      const post = await fetch('https://us-central1-nursely-b7c6d.cloudfunctions.net/api/post', {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'PUT',
         body: JSON.stringify({ postId, description })
      })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
      
      return post
   }
);

// DELETE a single user post
export const deletePost = createAsyncThunk(
   'posts/deletePost',
   async (postData: any) => {
      const token = await AsyncStorage.getItem('token');
      const postId = await fetch('https://us-central1-nursely-b7c6d.cloudfunctions.net/api/post', {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'DELETE',
         body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
      
      return postId
   }
);

// LIKE a users post
export const likePost = createAsyncThunk(
   'posts/likePost',
   async ({ postId, likesIdRef }: any) => {
      const token = await AsyncStorage.getItem('token')
      const data = fetch('https://us-central1-nursely-b7c6d.cloudfunctions.net/api/like-post', {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'POST',
         body: JSON.stringify({ postId, likesIdRef })
      })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))

      return data
   }
);

// COMMENT on a users post
export const createNewComment = createAsyncThunk(
   'posts/comments',
   async ({ comment, commentIdRef }: any) => {
      const token = await AsyncStorage.getItem('token')
      const data = await fetch('https://us-central1-nursely-b7c6d.cloudfunctions.net/api/comment', {
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         },
         method: 'POST',
         body: JSON.stringify({ comment, commentIdRef })
      })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
      
      console.log(data)
      return data
   }
);