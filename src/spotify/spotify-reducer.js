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
  spotifyProfile: null,
  shortTopSongs: [],
  mediumTopSongs: [],
  longTopSongs: [],
  recs: [],
  recsPlaylistURL: "",
  recsLoading: false,
};

const spotifyReducer = createSlice({
  name: "spotify",
  initialState,
  extraReducers: {
    [getSpotifyProfileThunk.fulfilled]: (state, action) => {
      state.spotifyProfile = action.payload;
    },
    [getSpotifyProfileThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
    },
    [spotifyLogoutThunk.fulfilled]: (state, action) => {
      state.spotifyProfile = null;
    },
    [getSpotifyShortTopSongsThunk.fulfilled]: (state, action) => {
      state.shortTopSongs = action.payload;
    },
    [getSpotifyShortTopSongsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
    },
    [getSpotifyMediumTopSongsThunk.fulfilled]: (state, action) => {
      state.mediumTopSongs = action.payload;
    },
    [getSpotifyMediumTopSongsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
    },
    [getSpotifyLongTopSongsThunk.fulfilled]: (state, action) => {
      state.longTopSongs = action.payload;
    },
    [getSpotifyLongTopSongsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
    },
    [getSpotifyRecsThunk.fulfilled]: (state, action) => {
      state.recs = action.payload;
      state.recsPlaylistURL = "";
    },
    [getSpotifyRecsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
    },
    [addRecsToPlaylistThunk.fulfilled]: (state, action) => {
      state.recsPlaylistURL = action.payload;
      state.recsLoading = false;
    },
    [addRecsToPlaylistThunk.pending]: (state, action) => {
      state.recsLoading = true;
    },
    [addRecsToPlaylistThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
    },
  },
});

export default spotifyReducer.reducer;
