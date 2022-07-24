import { createSlice } from '@reduxjs/toolkit';
import { PostStateI } from './post.interface';
import { createNewComment, createPost, deletePost, fetchPost, fetchPosts, likePost, updatePost } from './post.actions';

const initialState: PostStateI = {
   loading: 'idle',
   post: {},
   posts: [],
   comments: [],
   error: null
}

export const postSlice = createSlice({
   name: 'post',
   initialState,
   reducers: {},
   extraReducers: builder => {
      // Returns all user posts
      builder.addCase(fetchPosts.pending, (state, action) => {
         state.loading = 'pending'
         state.posts = []
      })
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
         state.loading = 'succeeded'
         state.posts.push(...action.payload)
      })
      builder.addCase(fetchPosts.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Something went wrong fetching posts. Try again'
      })

      // Returns a single user post
      builder.addCase(fetchPost.pending, (state, action) => {
         state.loading = 'pending'
         state.post = []
         state.comments = []
      })
      builder.addCase(fetchPost.fulfilled, (state, action) => {
         const { post, comments } = action.payload;
         state.loading = 'succeeded'
         state.post = post
         state.comments = comments
      })
      builder.addCase(fetchPost.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Something went wrong fetching this post. Try again'
      })

      // Returns the newly created post
      builder.addCase(createPost.pending, (state, action) => {
         state.loading = 'pending'
      })
      builder.addCase(createPost.fulfilled, (state, action) => {
         state.loading = 'succeeded'
         state.posts.push(action.payload)
      })
      builder.addCase(createPost.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Something went wrong create a new post. Try again'
      })

      // Returns the updated post
      builder.addCase(updatePost.pending, (state, action) => {
         state.loading = 'pending'
      })
      builder.addCase(updatePost.fulfilled, (state, action) => {
         const { postId, description } = action.payload;
         state.loading = 'succeeded'
         state.posts = state.posts.map(post => {
            if(post.postId === postId) {
               return({ ...post, description })
            }
            return post
         })
      })
      builder.addCase(updatePost.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Something went wrong updating this post. Try again'
      })

      // REMOVES deleted post from posts array
      builder.addCase(deletePost.pending, (state, action) => {
         state.loading = 'pending'
      })
      builder.addCase(deletePost.fulfilled, (state, action) => {
         state.loading = 'succeeded'
         state.posts = state.posts.filter(post => post.postId !== action.payload.postId)
      })
      builder.addCase(deletePost.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Something went wrong deleting this post. Try again'
      })

      // Returns liked postId with postLiked either true or false
      builder.addCase(likePost.fulfilled, (state, action) => {
         const { postId, postLiked }: any = action.payload
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

      // Returns the newly created comment
      builder.addCase(createNewComment.pending, (state, action) => {
         state.loading = 'pending'
      })
      builder.addCase(createNewComment.fulfilled, (state, action) => {
         state.loading = 'succeeded'
         state.comments.push(action.payload)
      })
      builder.addCase(createNewComment.rejected, (state, action) => {
         state.loading = 'failed'
         state.error = 'Something went wrong creating new comment. Try again'
      })

   }
})