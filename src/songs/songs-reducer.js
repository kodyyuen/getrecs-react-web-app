import { createSlice } from "@reduxjs/toolkit";
import { findSongBySearchTermThunk, findSongBySongIDThunk } from "./songs-thunks";
import { findWhoRecentlyLikedThunk } from "../users/users-thunk";

const initialState = {
  songs: [],
  details: null,
  likedBy: [],
}

const songsReducer = createSlice({
  name: "songs",
  initialState,
  extraReducers: {
    [findSongBySearchTermThunk.fulfilled]: (state, action) => {
      state.songs = action.payload;
    },
    [findSongBySongIDThunk.fulfilled]: (state, action) => {
      state.details = action.payload;
    },
    [findWhoRecentlyLikedThunk.fulfilled]: (state, action) => {
      state.likedBy = action.payload;
    }
  }
})

export default songsReducer.reducer;