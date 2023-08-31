import axios from "axios";
import { Buffer } from "buffer";

const auth_token = Buffer.from(
  `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
  "utf-8"
).toString("base64");

let API_TOKEN = null;
const SEARCH_TRACK_URL = "https://api.spotify.com/v1/tracks";
const RECOMMENDATIONS_URL = "https://api.spotify.com/v1/recommendations";

const api = axios.create({ withCredentials: true });
// const SONGS_API_URL = 'http://localhost:4000/songs';
const SONGS_API_URL =
  "https://getrecs-node-server-app-6d8abdb70e6b.herokuapp.com/songs";

const getToken = async () => {
  try {
    //make post request to SPOTIFY API for access token, sending relavent info
    const token_url = "https://accounts.spotify.com/api/token";

    const response = await axios.post(
      token_url,
      { grant_type: "client_credentials" },
      {
        headers: {
          Authorization: `Basic ${auth_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    //return access token
    console.log("GetToken: ", response.data.access_token);
    API_TOKEN = response.data.access_token;
    //return response.data.access_token
    //console.log(response.data.access_token);
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
};

const createSearchURL = (term) => {
  return `https://api.spotify.com/v1/search?q=${term}&type=track`;
};

export const findSongBySearchTerm = async (term) => {
  if (!API_TOKEN) {
    await getToken();
  }
  const response = await axios.get(createSearchURL(term), {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data.tracks.items;
};

export const findSongBySongID = async (songID) => {
  if (!API_TOKEN) {
    await getToken();
  }
  const response = await axios.get(`${SEARCH_TRACK_URL}/${songID}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
};

export const findMultipleSongsBySongID = async (songList) => {
  if (!API_TOKEN) {
    await getToken();
  }
  const songListFormatted = songList.join("%2C");
  const response = await axios.get(
    `${SEARCH_TRACK_URL}?ids=${songListFormatted}`,
    { headers: { Authorization: `Bearer ${API_TOKEN}` } }
  );
  return response.data;
};

export const getRecommendationsBySongs = async (songList) => {
  if (!API_TOKEN) {
    await getToken();
  }

  const formattedSongList = songList.join(",");
  const query = {
    seed_artists: "",
    seed_genres: "",
    seed_tracks: formattedSongList,
  };

  const response = await axios.get(RECOMMENDATIONS_URL, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    params: query,
  });
  if (response.data.tracks) {
    await api.post(`${SONGS_API_URL}/createBatch`, response.data.tracks);
  }
  return response.data;
};

export const getRecommendationsByGenres = async (genres) => {
  if (!API_TOKEN) {
    await getToken();
  }

  const formattedGenreList = genres.join(",");
  const query = {
    seed_artists: "",
    seed_genres: formattedGenreList,
    seed_tracks: "",
  };
  const response = await axios.get(RECOMMENDATIONS_URL, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    params: query,
  });
  if (response.data.tracks) {
    await api.post(`${SONGS_API_URL}/createBatch`, response.data.tracks);
  }
  return response.data;
};

export const getGenres = async () => {
  if (!API_TOKEN) {
    await getToken();
  }

  const response = await axios.get(
    `${RECOMMENDATIONS_URL}/available-genre-seeds`,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );
  return response.data;
};

export const getTopTenSongs = async () => {
  const response = await api.get(`${SONGS_API_URL}/topTen`);
  return response.data;
};
