import { createSlice } from "@reduxjs/toolkit";
import { findWhoRecentlyLikedThunk } from "../users/users-thunk";
import {
  findMultipleSongsBySongIDThunk,
  findSongBySearchTermThunk,
  findSongBySongIDThunk,
  getGenresThunk,
  getRecommendationsByGenresThunk,
  getTopTenSongsThunk,
} from "./songs-thunks";

const initialState = {
  songs: [],
  details: null,
  multipleDetails: null,
  likedBy: [],
  genres: [],
  tempRecs: [], // temp storage for recommendations generated for anon users
  topTenSongs: [],
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
    [findMultipleSongsBySongIDThunk.fulfilled]: (state, action) => {
      state.multipleDetails = action.payload.tracks;
    },
    [findWhoRecentlyLikedThunk.fulfilled]: (state, action) => {
      state.likedBy = action.payload;
    },
    [getGenresThunk.fulfilled]: (state, action) => {
      state.genres = action.payload.genres;
    },
    [getRecommendationsByGenresThunk.fulfilled]: (state, action) => {
      state.tempRecs = action.payload.tracks;
    },
    [getTopTenSongsThunk.fulfilled]: (state, action) => {
      state.topTenSongs = action.payload;
    }
  }
})

export default songsReducer.reducer;