import { createSlice } from "@reduxjs/toolkit";
import {
  findUserByIdThunk,
  loginThunk,
  logoutThunk,
  profileThunk,
  registerThunk,
  updateUserThunk,
  getRecommendationsByLikedSongsThunk,
  getRecommendationsByGenresAndSaveThunk,
} from "./users-thunk";

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    currentUser: null,
    publicProfile: null,
  },
  extraReducers: {
    [findUserByIdThunk.fulfilled]: (state, action) => {
      state.publicProfile = action.payload
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.currentUser = null
    },
    [profileThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload
    },
    [updateUserThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [getRecommendationsByLikedSongsThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [getRecommendationsByGenresAndSaveThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    }
  }
})

export default usersReducer.reducer