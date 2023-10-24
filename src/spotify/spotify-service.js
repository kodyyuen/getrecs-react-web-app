import axios from "axios";
import { Buffer } from "buffer";

// const refreshAuthToken = async (callback, req, res) => {
//   const response = await axios.post(
//     "https://accounts.spotify.com/api/token",
//     {
//       refresh_token: req.session.refresh_token,
//       grant_type: "refresh_token",
//     },
//     {
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
//           "utf-8"
//         ).toString("base64")}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     }
//   );

//   req.session.apiKey = response.data.access_token;
//   callback(req, res);
// };

export const getApiKey = async (code) => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: `${process.env.REACT_APP_SITE_BASE_URL}/spotify/callback`,
    },
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
          "utf-8"
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
};

export const getSpotifyProfile = async (apiKey) => {
  const response = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return response.data;
};

export const spotifyLogout = async () => {
  return null;
};

export const getSpotifyShortTopArtists = async (apiKey) => {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyMediumTopArtists = async (apiKey) => {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyLongTopArtists = async (apiKey) => {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyShortTopSongs = async (apiKey) => {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyMediumTopSongs = async (apiKey) => {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyLongTopSongs = async (apiKey) => {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20&offset=0",
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return response.data.items;
};

export const getSpotifyRecs = async ({ seeds, apiKey }) => {
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

export const findPlaylistsWithSong = async ({ findSong, apiKey }) => {
  let playlists = [];
  let userPlaylists;
  let next = "https://api.spotify.com/v1/me/playlists?limit=50&offset=0";

  while (next) {
    userPlaylists = await axios.get(next, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    next = userPlaylists.data.next;

    for (const i of userPlaylists.data.items) {
      if (await playlistContainsSong(i.tracks.href, findSong, apiKey)) {
        playlists.push(i);
      }
    }
  }
  return playlists;
};

const playlistContainsSong = async (playlistURL, findSong, apiKey) => {
  let playlist;
  let next = `${playlistURL}?limit=50&offset=0`;

  while (next) {
    playlist = await axios.get(next, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    next = playlist.data.next;

    for (const i of playlist.data.items) {
      console.log('i')
      console.log(i)
      if (i.track && i.track.id === findSong) {
        return true;
      }
    }
  }
  return false;
};
