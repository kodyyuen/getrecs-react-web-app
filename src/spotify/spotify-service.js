import axios from "axios";

const BASE_API_URL = "http://localhost:4000";
const SPOTIFY_API_URL = "http://localhost:4000/spotify";

const api = axios.create({ withCredentials: true });

export const getSpotifyProfile = async () => {
  const response = await api.get(`${SPOTIFY_API_URL}/profile`);
  console.log('service')
  return response.data;
};

export const spotifyLogout = async () => {
  const response = await api.post(`${SPOTIFY_API_URL}/logout`);
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