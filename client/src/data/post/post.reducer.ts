import { createSlice } from '@reduxjs/toolkit';
import { PostStateI } from './post.interface';
import { fetchPost } from './post.actions';

const initialState: PostStateI = {
   loading: 'idle',
   post: {},
   comments: [],
   error: null
}

export const postSlice = createSlice({
   name: 'post',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(fetchPost.pending, (state, action) => {
         state.loading = 'pending'
      })
      builder.addCase(fetchPost.fulfilled, (state, action) => {
         const { post, comments } = action.payload;
         console.log(post)
         state.loading = 'succeeded'
         state.post = post
         state.comments = comments
         state.error = null
      })
      builder.addCase(fetchPost.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Something bad happened...'
      })
   }
})