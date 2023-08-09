import { createSlice } from "@reduxjs/toolkit";
import {
  addRecsToPlaylistThunk,
  getSpotifyLongTopSongsThunk,
  getSpotifyMediumTopSongsThunk,
  getSpotifyProfileThunk,
  getSpotifyRecsThunk,
  getSpotifyShortTopSongsThunk,
  spotifyLogoutThunk,
} from "./spotify-thunks";

const initialState = {
  spotifyProfile: {},
  spotifyUser: null,
  shortTopSongs: [],
  mediumTopSongs: [],
  longTopSongs: [],
  shortRecs: [],
  mediumRecs: [],
  topRecs: [],
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
    [getSpotifyRecsThunk.fulfilled]: (state, action) => {
      console.log("shortRecs: " + action.payload)
      state.shortRecs = action.payload;
    },
    [addRecsToPlaylistThunk.fulfilled]: (state, action) => {
      console.log('nuts')
    }
  },
});

export default spotifyReducer.reducer;
