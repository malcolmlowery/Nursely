import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/user.reducer';
import { postsSlice } from './posts/posts.reducer';
import { postSlice } from './post/post.reducer';

export const store = configureStore({
   reducer: {
      postSlice: postSlice.reducer,
      user: userSlice.reducer,
   }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;