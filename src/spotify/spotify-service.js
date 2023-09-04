import axios from "axios";

const BASE_API_URL = "http://localhost:4000";
// const SPOTIFY_API_URL = "http://localhost:4000/spotify";
const SPOTIFY_API_URL = "https://getrecs-node-server-app-6d8abdb70e6b.herokuapp.com/spotify";

const api = axios.create({ withCredentials: true });

export const getSpotifyProfile = async () => {
  const response = await api.get(`${SPOTIFY_API_URL}/profile`);
  return response.data;
};

export const spotifyLogout = async () => {
  const response = await api.post(`${SPOTIFY_API_URL}/logout`);
  return response.data;
}

export const getSpotifyShortTopArtists = async () => {
  const response = await api.get(`${SPOTIFY_API_URL}/topartists/short`);
  return response.data;
}

export const getSpotifyMediumTopArtists = async () => {
  const response = await api.get(`${SPOTIFY_API_URL}/topartists/medium`);
  return response.data;
}

export const getSpotifyLongTopArtists = async () => {
  const response = await api.get(`${SPOTIFY_API_URL}/topartists/long`);
  return response.data;
}

export const getSpotifyShortTopSongs = async () => {
  const response = await api.get(`${SPOTIFY_API_URL}/topsongs/short`);
  return response.data;
}

export const getSpotifyMediumTopSongs = async () => {
  const response = await api.get(`${SPOTIFY_API_URL}/topsongs/medium`);
  return response.data;
}

export const getSpotifyLongTopSongs = async () => {
  const response = await api.get(`${SPOTIFY_API_URL}/topsongs/long`);
  return response.data;
}

export const getSpotifyRecs = async (seeds) => {
  const response = await api.post(`${SPOTIFY_API_URL}/recs`, seeds);
  return response.data;
}

export const addRecsToPlaylist = async (params) => {
  const response = await api.post(`${SPOTIFY_API_URL}/recs/playlist`, params);
  return response.data;
}