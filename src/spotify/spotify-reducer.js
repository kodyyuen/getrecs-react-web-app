import { createSlice } from "@reduxjs/toolkit";
import {
  addRecsToPlaylistThunk,
  getApiKeyThunk,
  getSpotifyLongTopArtistsThunk,
  getSpotifyLongTopSongsThunk,
  getSpotifyMediumTopArtistsThunk,
  getSpotifyMediumTopSongsThunk,
  getSpotifyProfileThunk,
  getSpotifyRecsThunk,
  getSpotifyShortTopArtistsThunk,
  getSpotifyShortTopSongsThunk,
  spotifyLogoutThunk,
} from "./spotify-thunks";

const initialState = {
  spotifyProfile: null,
  shortTopSongs: [],
  mediumTopSongs: [],
  longTopSongs: [],
  shortTopArtists: [],
  mediumTopArtists: [],
  longTopArtists: [],
  recs: [],
  recsPlaylistURL: "",
  recsLoading: false,
  apiKey: "",
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
      state.apiKey = "";
    },
    [spotifyLogoutThunk.fulfilled]: (state, action) => {
      state.spotifyProfile = null;
      state.apiKey = "";
    },
    [getSpotifyShortTopSongsThunk.fulfilled]: (state, action) => {
      state.shortTopSongs = action.payload;
    },
    [getSpotifyShortTopSongsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
      state.apiKey = "";
    },
    [getSpotifyMediumTopSongsThunk.fulfilled]: (state, action) => {
      state.mediumTopSongs = action.payload;
    },
    [getSpotifyMediumTopSongsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
      state.apiKey = "";
    },
    [getSpotifyLongTopSongsThunk.fulfilled]: (state, action) => {
      state.longTopSongs = action.payload;
    },
    [getSpotifyLongTopSongsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
      state.apiKey = "";
    },
    [getSpotifyShortTopArtistsThunk.fulfilled]: (state, action) => {
      state.shortTopArtists = action.payload;
    },
    [getSpotifyShortTopArtistsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
      state.apiKey = "";
    },
    [getSpotifyMediumTopArtistsThunk.fulfilled]: (state, action) => {
      state.mediumTopArtists = action.payload;
    },
    [getSpotifyMediumTopArtistsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
      state.apiKey = "";
    },
    [getSpotifyLongTopArtistsThunk.fulfilled]: (state, action) => {
      state.longTopArtists = action.payload;
    },
    [getSpotifyLongTopArtistsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
      state.apiKey = "";
    },
    [getSpotifyRecsThunk.fulfilled]: (state, action) => {
      state.recs = action.payload;
      state.recsPlaylistURL = "";
    },
    [getSpotifyRecsThunk.rejected]: (state, action) => {
      state.spotifyProfile = null;
      state.apiKey = "";
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
      state.apiKey = "";
    },
    [getApiKeyThunk.fulfilled]: (state, action) => {
      state.apiKey = action.payload;
    },
    [getApiKeyThunk.rejected]: (state, action) => {
      console.log("getApiKeyThunk.rejected: " + action);
    },
  },
});

export default spotifyReducer.reducer;
