import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSpotifyLongTopSongs, getSpotifyMediumTopSongs, getSpotifyProfile, getSpotifyShortTopSongs, spotifyLogout } from "./spotify-service";

export const getSpotifyProfileThunk = createAsyncThunk(
    'spotifyProfile',
    async () => await getSpotifyProfile()
)

export const spotifyLogoutThunk = createAsyncThunk(
    'spotifyLogout',
    async () => await spotifyLogout()
)

export const getSpotifyShortTopSongsThunk = createAsyncThunk(
    'spotifyGetShortTopSongs',
    async () => await getSpotifyShortTopSongs()
)

export const getSpotifyMediumTopSongsThunk = createAsyncThunk(
    'spotifyGetMediumTopSongs',
    async () => await getSpotifyMediumTopSongs()
)

export const getSpotifyLongTopSongsThunk = createAsyncThunk(
    'spotifyGetLongTopSongs',
    async () => await getSpotifyLongTopSongs()
)