import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/user.reducer';
import { postsSlice } from './posts/posts.reducer';

export const store = configureStore({
   reducer: {
      posts: postsSlice.reducer,
      user: userSlice.reducer,
   }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;