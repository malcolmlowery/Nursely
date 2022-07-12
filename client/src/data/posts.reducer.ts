import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
};

interface PostsStateI {
   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
   posts: PostDetailsI[]
   error: string | null
};

export const likePost = createAsyncThunk(
   'post/likePost',
   async () => {
      
   }
);

export const fetchPosts = createAsyncThunk(
   'posts/fetchPosts',
   async () => {
      const response = await fetch('http://localhost:3000/data')
      return (await response.json().then(data => data))
   }
);

const initialState: PostsStateI = {
   loading: 'idle',
   posts: [],
   error: null
};

export const postsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchPosts.pending, (state, _) => {
         state.loading = 'pending'
         state.posts = []
      })
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
         state.loading = 'succeeded'
         state.posts.push(...action.payload)
      })
      builder.addCase(fetchPosts.rejected, (state, action) => {
         state.loading = 'succeeded'
         state.posts = []
         state.error = 'An error has occurred'
      })
   }
});