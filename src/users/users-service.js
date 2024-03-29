import axios from "axios";
import { getRecommendationsBySongs, getRecommendationsByGenres } from "../songs/songs-service";

// const USER_API_URL = 'http://localhost:4000/users'
// const BASE_API_URL = 'http://localhost:4000'
// const USER_API_URL = 'https://getrecs-node-server-app-6d8abdb70e6b.herokuapp.com/users'
// const BASE_API_URL = 'https://getrecs-node-server-app-6d8abdb70e6b.herokuapp.com'
const BASE_API_URL = process.env.REACT_APP_SONGS_API_URL;
const USER_API_URL = `${BASE_API_URL}/users`;

const api = axios.create({ withCredentials: true });

export const findUserById = async (uid) => {
  const response = await api.get(`${USER_API_URL}/${uid}`);
  const user = response.data;
  return user;
}

export const findAllUsers = async () => {
  const response = await axios.get(USER_API_URL)
  return response.data
}

export const register = async (user) => {
  const response = await api.post(`${BASE_API_URL}/register`, user);
  const newUser = response.data;
  return newUser;
}

export const login = async (user) => {
  const response = await api.post(`${BASE_API_URL}/login`, user);
  return response.data;
}

export const logout = async () => {
  const response = await api.post(`${BASE_API_URL}/logout`);
  return response.data;
}

export const profile = async () => {
  const response = await api.post(`${BASE_API_URL}/profile`);
  return response.data;
}

export const updateUser = async (updates) => {
  const response = await api.put(`${USER_API_URL}/update`, updates);
  return response.data;
}

export const findWhoRecentlyLiked = async (songID) => {
  const response = await api.get(`${BASE_API_URL}/recentlyLikedBy/${songID}`);
  return response.data;
}

export const getRecommendationsByLikedSongs = async (songs) => {
  const recs = await getRecommendationsBySongs(songs);
  if (recs.tracks) {
    const response = await api.put(`${USER_API_URL}/appendToField`, {
        recommendations: {
            songs: recs.tracks, 
            timeStamp: new Date().toLocaleString('en-US', { timeZone: 'EST' })
        }
    });
    return response.data;
  } else {
    console.log('error occured when fetching recs', recs);
  }
}

export const getRecommendationsByGenresAndSave = async (genres) => {
  const recs = await getRecommendationsByGenres(genres);
  if (recs.tracks) {
    const response = await api.put(`${USER_API_URL}/appendToField`, { 
      recommendations: {
        songs: recs.tracks, 
        timeStamp: new Date().toLocaleString('en-US', { timeZone: 'EST' })
      }
    });
    return response.data;
  } else {
    console.log('error occured when fetching recs', recs);
  }
}

export const deleteRecommendations = async () => {
  const response = await api.put(`${USER_API_URL}/update`, {
    recommendations: []
  });
  return response.data;
}

export const deleteUser = async (uid) => { 
  const response = await api.delete(`${USER_API_URL}/deleteUser/${uid}`);
  return response.data;
}

export const deleteRecSet = async (timeStamp) => {
  const response = await api.put(`${USER_API_URL}/removeRec`, {
    timeStamp: timeStamp
  });
  return response.data;
}