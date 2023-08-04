import { createSlice } from "@reduxjs/toolkit";
import {
  getSpotifyLongTopSongsThunk,
  getSpotifyMediumTopSongsThunk,
  getSpotifyProfileThunk,
  getSpotifyShortTopSongsThunk,
  spotifyLogoutThunk,
} from "./spotify-thunks";

const initialState = {
  spotifyProfile: {},
  spotifyUser: null,
  shortTopSongs: [],
  mediumTopSongs: [],
  longTopSongs: [],
};

const spotifyReducer = createSlice({
  name: "spotify",
  initialState,
  extraReducers: {
    [getSpotifyProfileThunk.fulfilled]: (state, action) => {
      state.spotifyProfile = action.payload;
    },
    [spotifyLogoutThunk.fulfilled]: (state, action) => {
      state.spotifyProfile = {};
    },
    [getSpotifyShortTopSongsThunk.fulfilled]: (state, action) => {
      state.shortTopSongs = action.payload;
    },
    [getSpotifyMediumTopSongsThunk.fulfilled]: (state, action) => {
      state.mediumTopSongs = action.payload;
    },
    [getSpotifyLongTopSongsThunk.fulfilled]: (state, action) => {
      state.longTopSongs = action.payload;
    },
  },
});

export default spotifyReducer.reducer;
