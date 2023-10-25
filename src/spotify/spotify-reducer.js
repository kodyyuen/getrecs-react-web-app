import { createSlice } from "@reduxjs/toolkit";
import {
  addRecsToPlaylistThunk,
  findPlaylistsWithSongThunk,
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
  foundPlaylists: [],
  playlistsLoading: false,
  currentFindSong:  "",
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
      state.recsLoading = false;
      state.spotifyProfile = null;
      state.apiKey = "";
    },
    [getApiKeyThunk.fulfilled]: (state, action) => {
      state.apiKey = action.payload;
    },
    [getApiKeyThunk.rejected]: (state, action) => {
      console.log("getApiKeyThunk.rejected");
      console.log(action);
    },
    [findPlaylistsWithSongThunk.fulfilled]: (state, action) => {
      state.currentFindSong = action.payload[0];
      state.foundPlaylists = action.payload.slice(1);
      state.playlistsLoading = false;
    },
    [findPlaylistsWithSongThunk.pending]: (state, action) => {
      state.playlistsLoading = true;
    },
    [findPlaylistsWithSongThunk.rejected]: (state, action) => {
      state.playlistsLoading = false;
      console.log("findPlaylistsWithSongThunk.rejected");
      console.log(action);
    },
  },
});

export default spotifyReducer.reducer;
