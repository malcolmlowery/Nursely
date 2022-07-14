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

export const fetchPosts = createAsyncThunk(
   'posts/fetchPosts',
   async () => {
      const response = await fetch('http://localhost:5001/nursely-b7c6d/us-central1/api/posts')
      return (await response.json().then(data => data))
   }
);

export const createPost = createAsyncThunk(
   'posts/createPost',
   async (description: string) => {
      return (await fetch('http://localhost:5001/nursely-b7c6d/us-central1/api/posts', {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify({ "description": description })
      })
      .then(response => response.json()))
   }
);

export const updatePost = createAsyncThunk(
   'posts/updatePost',
   async (updatedData: any) => {
      return (await fetch(`http://localhost:5001/nursely-b7c6d/us-central1/api/posts/post?postID=${updatedData.postID}`, {
         headers: { 'Content-Type': 'application/json' },
         method: 'PUT',
         body: JSON.stringify({ "description": updatedData.description })
      })
      .then(response => response.json()))
   }
);

export const likePost = createAsyncThunk(
   'posts/likePost',
   async (postID: string) => {
      const uid = 'FRbhgBU60CjtLaZ8wTox';
      return (await fetch(`http://localhost:5001/nursely-b7c6d/us-central1/api/likes?postID=${postID}`, {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify({ uid })
      })
      .then(response => response.json()))
   }
);

export const deletePost = createAsyncThunk(
   'posts/deletePost',
   async (postID: string) => {
      const uid = 'FRbhgBU60CjtLaZ8wTox';
      return (await fetch(`http://localhost:5001/nursely-b7c6d/us-central1/api/posts/post?postID=${postID}`, {
         headers: { 'Content-Type': 'application/json' },
         method: 'DELETE',
         body: JSON.stringify({ uid })
      })
      .then(response => response.json()))
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
      builder.addCase(createPost.fulfilled, (state, action) => {
         state.posts.push({...action.payload})
      })
      builder.addCase(createPost.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Error creating post'
      })
      builder.addCase(updatePost.fulfilled, (state, action) => {
         const { postID, description }: any = action.payload
         state.posts = state.posts.map(post => {
            if(post.postID === postID) {
               return {
                  ...post,
                  description: description
               }
            }
            return post
         })
      })
      builder.addCase(updatePost.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Error creating post'
      })
      builder.addCase(likePost.fulfilled, (state, action) => {
         const { postLiked, postID }: any = action.payload

         state.posts = state.posts.map(post => {
            if(post.postID === postID && postLiked === true) {
               return {
                  ...post,
                  postLiked: true,
                  numberOfLikes: post.numberOfLikes + 1
               }
            } else if(post.postID === postID && postLiked === false) {
               return {
                  ...post,
                  postLiked: false,
                  numberOfLikes: post.numberOfLikes - 1
               }
            }
            return post
         })
      })
      builder.addCase(deletePost.fulfilled, (state, action) => {
         const { postID }: any = action.payload
         state.posts = state.posts.filter(post => post.postID !== postID)
      })
   }
});