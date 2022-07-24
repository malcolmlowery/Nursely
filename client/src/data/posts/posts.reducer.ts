import { createSlice } from '@reduxjs/toolkit';
import { PostsStateI } from './post.interface';
import { 
   createPost, 
   fetchPosts, 
   updatePost, 
   deletePost, 
   likePost 
} from './post.actions';

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

      // Get Posts
      builder.addCase(fetchPosts.pending, (state, _) => {
         state.loading = 'pending'
         state.posts = []
      })
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
         state.loading = 'succeeded'
         state.posts.push(...action.payload)
      })
      builder.addCase(fetchPosts.rejected, (state, action) => {
         state.loading = 'failed'
         state.posts = []
         state.error = 'An error has occurred'
      })

      // Create Post
      builder.addCase(createPost.fulfilled, (state, action) => {
         state.posts.push({...action.payload})
      })
      builder.addCase(createPost.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Error creating post'
      })

      // Update Post
      builder.addCase(updatePost.fulfilled, (state, action) => {
         const { postId, description }: any = action.payload
         state.posts = state.posts.map(post => {
            if(post.postId === postId) {
               return { ...post, description }
            }
            return post
         })
      })
      builder.addCase(updatePost.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Error creating post'
      })

      // Delete Post
      builder.addCase(deletePost.fulfilled, (state, action) => {
         const { postId }: any = action.payload
         state.posts = state.posts.filter(post => post.postId !== postId)
      })

      // Like Post
      builder.addCase(likePost.fulfilled, (state, action) => {
         const { postLiked, postId }: any = action.payload
         state.posts = state.posts.map(post => {
            if(post.postId === postId && postLiked === true) {
               return {
                  ...post,
                  postLiked: true,
                  numberOfLikes: post.numberOfLikes + 1
               }
            } else if(post.postId === postId && postLiked === false) {
               return {
                  ...post,
                  postLiked: false,
                  numberOfLikes: post.numberOfLikes - 1
               }
            }
            return post
         })
      })
   }
});