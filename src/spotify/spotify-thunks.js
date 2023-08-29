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
  getSpotifyLongTopArtists
} from "./spotify-service";

export const getSpotifyProfileThunk = createAsyncThunk(
  "spotifyProfile",
  async () => await getSpotifyProfile()
);

export const spotifyLogoutThunk = createAsyncThunk(
  "spotifyLogout",
  async () => await spotifyLogout()
);

export const getSpotifyShortTopArtistsThunk = createAsyncThunk(
  "spotifyGetShortTopArtists",
  async () => await getSpotifyShortTopArtists()
);

export const getSpotifyMediumTopArtistsThunk = createAsyncThunk(
  "spotifyGetMediumTopArtists",
  async () => await getSpotifyMediumTopArtists()
);

export const getSpotifyLongTopArtistsThunk = createAsyncThunk(
  "spotifyGetLongTopArtists",
  async () => await getSpotifyLongTopArtists()
);

export const getSpotifyShortTopSongsThunk = createAsyncThunk(
  "spotifyGetShortTopSongs",
  async () => await getSpotifyShortTopSongs()
);

export const getSpotifyMediumTopSongsThunk = createAsyncThunk(
  "spotifyGetMediumTopSongs",
  async () => await getSpotifyMediumTopSongs()
);

export const getSpotifyLongTopSongsThunk = createAsyncThunk(
  "spotifyGetLongTopSongs",
  async () => await getSpotifyLongTopSongs()
);

export const getSpotifyRecsThunk = createAsyncThunk(
  "spotifyGetRecs",
  async (seeds) => await getSpotifyRecs(seeds)
);

export const addRecsToPlaylistThunk = createAsyncThunk(
  "spotifyAddRecs",
  async (params) => await addRecsToPlaylist(params)
);
