import { createSlice } from '@reduxjs/toolkit';
import { createUser } from './user.actions';

const initialState: any = {
   loading: 'idle',
   user: null,
   error: null
}

export const userSlice = createSlice({
   'name': 'user',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(createUser.fulfilled, (state, action) => {
         console.log('user reducer')
      })
   }
})