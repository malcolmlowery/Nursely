import { createSlice, createAction, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface PostPublisherInfoI {
   uid: string
   profileImageURL: string
   firstName: string
   lastName: string
   middleIntial: string | null
   jobTitle: string
};

export interface PostDetailsI {
   postID: string
   publisher: PostPublisherInfoI
   description: string
   numberOfComments: number
   numberOfLikes: number
   postLiked: boolean
}

interface PostsStateI {
   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
   posts: PostDetailsI[]
};

export const fetchPosts = createAsyncThunk(
   'posts/fetchPosts',
   async () => {
      const response = await fetch('http://localhost:3000/data')
      return (await response.json().then(data => data)) 
   }
);

const initialState: PostsStateI = {
   loading: 'idle',
   posts: []
};

export const postsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {},
   extraReducers: (builder) =>{
      builder.addCase(fetchPosts.pending, (state, action) => {
         state.posts = []
      })
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
         state.posts.push(...action.payload)
      })
   }
});