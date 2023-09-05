import axios from "axios";
import { Buffer } from "buffer";
import { useSelector } from "react-redux";

const BASE_API_URL = "http://localhost:4000";
// const SPOTIFY_API_URL = "http://localhost:4000/spotify";
const SPOTIFY_API_URL =
  "https://getrecs-node-server-app-6d8abdb70e6b.herokuapp.com/spotify";

const refresh_token = "";
// const { apiKey } = useSelector((state) => state.spotify);
// let apiKey = "";

const api = axios.create({ withCredentials: true });

const refreshAuthToken = async (callback, req, res) => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      refresh_token: req.session.refresh_token,
      grant_type: "refresh_token",
    },
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET,
            "utf-8"
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  req.session.apiKey = response.data.access_token;
  callback(req, res);
};

const redirectLogin = async () => {
  const scopes = ["user-top-read", "playlist-modify-private"];

  const str = new URLSearchParams({
    response_type: "token",
    client_id: process.env.REACT_APP_CLIENT_ID,
    scope: scopes.join(" "),
    redirect_uri: `${process.env.REACT_APP_SITE_BASE_URL}/spotify`,
    show_dialog: "true",
  });

  window.location.redirect(
    `https://accounts.spotify.com/authorize?${str.toString()}`
  );
};

export const getApiKey = async (code) => {
  console.log("getApiKey1");

  const auth_token = Buffer.from(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
    "utf-8"
  ).toString("base64");

  const redirect_uri = `${process.env.REACT_APP_SITE_BASE_URL}/spotify/callback`;
  console.log('redirect_uri: ' + redirect_uri)
  console.log('base_site_url: ' + process.env.REACT_APP_SITE_BASE_URL)
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    },
    {
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log("getApiKey2");
  console.log("apiKey: " + response.data.access_token);
  return response.data.access_token;
};

export const getSpotifyProfile = async (apiKey) => {
  const response = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  console.log("getSpotifyProfile: " + response.data);
  return response.data;
  // const response = await api.get(`${SPOTIFY_API_URL}/profile`);
  // return response.data;
};

export const spotifyLogout = async () => {
  // const response = await api.post(`${SPOTIFY_API_URL}/logout`);
  // return response.data;
  return null;
};

export const getSpotifyShortTopArtists = async (apiKey) => {
  // const response = await api.get(`${SPOTIFY_API_URL}/topartists/short`);
  // return response.data;
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyMediumTopArtists = async (apiKey) => {
  // const response = await api.get(`${SPOTIFY_API_URL}/topartists/medium`);
  // return response.data;
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyLongTopArtists = async (apiKey) => {
  // const response = await api.get(`${SPOTIFY_API_URL}/topartists/long`);
  // return response.data;
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyShortTopSongs = async (apiKey) => {
  // const response = await api.get(`${SPOTIFY_API_URL}/topsongs/short`);
  // return response.data;
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyMediumTopSongs = async (apiKey) => {
  // const response = await api.get(`${SPOTIFY_API_URL}/topsongs/medium`);
  // return response.data;
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyLongTopSongs = async (apiKey) => {
  // const response = await api.get(`${SPOTIFY_API_URL}/topsongs/long`);
  // return response.data;
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyRecs = async ({ seeds, apiKey }) => {
  // const response = await api.post(`${SPOTIFY_API_URL}/recs`, seeds);
  // return response.data;
  const response = await axios.get(
    "https://api.spotify.com/v1/recommendations",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: { seed_tracks: seeds.join(",") },
    }
  );
  return response.data.tracks;
};

export const addRecsToPlaylist = async ({ user_id, body, uris, apiKey }) => {
  // const response = await api.post(`${SPOTIFY_API_URL}/recs/playlist`, params);
  // return response.data;
  const playlist = await axios.post(
    `https://api.spotify.com/v1/users/${user_id}/playlists`,
    body,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const { id, external_urls } = playlist.data;
  const { spotify } = external_urls;

  const response = await axios.post(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    uris,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  if (response.data.snapshot_id) {
    return spotify;
  }
};
