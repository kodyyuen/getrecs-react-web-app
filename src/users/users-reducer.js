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
  deleteRecommendationsThunk,
  findAllUsersThunk,
  deleteUserThunk,
} from "./users-thunk";

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    currentUser: null,
    publicProfile: null,
    users: []
  },
  extraReducers: {
    [findUserByIdThunk.fulfilled]: (state, action) => {
      state.publicProfile = action.payload
    },
    [findAllUsersThunk.fulfilled]: (state, action) => {
      state.users = action.payload;
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
      state.currentUser = {...action.payload};
    },
    [deleteUserThunk.fulfilled]: (state, action) => {
    },
    [getRecommendationsByLikedSongsThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload
    },
    [getRecommendationsByGenresAndSaveThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload
    },
    [deleteRecommendationsThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload
    }
  }
})

export default usersReducer.reducer