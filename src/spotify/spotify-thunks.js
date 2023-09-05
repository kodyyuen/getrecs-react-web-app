import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSpotifyLongTopSongs,
  getSpotifyMediumTopSongs,
  getSpotifyProfile,
  getSpotifyRecs,
  getSpotifyShortTopSongs,
  spotifyLogout,
  addRecsToPlaylist,
  getSpotifyShortTopArtists,
  getSpotifyMediumTopArtists,
  getSpotifyLongTopArtists,
  getApiKey,
} from "./spotify-service";

export const getSpotifyProfileThunk = createAsyncThunk(
  "spotifyProfile",
  async (apiKey) => await getSpotifyProfile(apiKey)
);

export const spotifyLogoutThunk = createAsyncThunk(
  "spotifyLogout",
  async () => await spotifyLogout()
);

export const getSpotifyShortTopArtistsThunk = createAsyncThunk(
  "spotifyGetShortTopArtists",
  async (apiKey) => await getSpotifyShortTopArtists(apiKey)
);

export const getSpotifyMediumTopArtistsThunk = createAsyncThunk(
  "spotifyGetMediumTopArtists",
  async (apiKey) => await getSpotifyMediumTopArtists(apiKey)
);

export const getSpotifyLongTopArtistsThunk = createAsyncThunk(
  "spotifyGetLongTopArtists",
  async (apiKey) => await getSpotifyLongTopArtists(apiKey)
);

export const getSpotifyShortTopSongsThunk = createAsyncThunk(
  "spotifyGetShortTopSongs",
  async (apiKey) => await getSpotifyShortTopSongs(apiKey)
);

export const getSpotifyMediumTopSongsThunk = createAsyncThunk(
  "spotifyGetMediumTopSongs",
  async (apiKey) => await getSpotifyMediumTopSongs(apiKey)
);

export const getSpotifyLongTopSongsThunk = createAsyncThunk(
  "spotifyGetLongTopSongs",
  async (apiKey) => await getSpotifyLongTopSongs(apiKey)
);

export const getSpotifyRecsThunk = createAsyncThunk(
  "spotifyGetRecs",
  async (params) => await getSpotifyRecs(params)
);

export const addRecsToPlaylistThunk = createAsyncThunk(
  "spotifyAddRecs",
  async (params) => await addRecsToPlaylist(params)
);

export const getApiKeyThunk = createAsyncThunk(
  "spotifyGetApiKey",
  async (code) => await getApiKey(code)
);
