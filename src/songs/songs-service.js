/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

/*
TODO:
- Change client secret to environment variable
*/

import axios from 'axios'
import { Buffer } from 'buffer';
import SpotifyWebApi from 'spotify-web-api-js';

//const SEARCH_URL = "https://api.spotify.com/v1/search?q=wish&type=track"
let API_TOKEN = null

// const apiCall = async () => {
//     const response = await axios.get(SEARCH_URL, {headers: {"Authorization": `Bearer ${API_TOKEN}`}})
//     const trackId = response.data.tracks.items[0].id
//     console.log(trackId)
//     const trackData = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {headers: {"Authorization": `Bearer ${API_TOKEN}`}})
//     console.log(trackData.data)
//     const test = await axios.get("https://api.spotify.com/v1/search?query=wish&type=track&locale=en-US%2Cen%3Bq%3D0.6&offset=0&limit=20", {headers: {"Authorization": `Bearer ${API_TOKEN}`}})
//     console.log(test.data)
// }
const client_id = '9534d135519d4b049b481e8bc6862e40'; // Your client id
const client_secret = '958d137cb4e44d4b9eca6ad5333bf62e'; // Your secret
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

const SEARCH_TRACK_URL = "https://api.spotify.com/v1/tracks/"

const getToken = async () => {
  try{
    //make post request to SPOTIFY API for access token, sending relavent info
    const token_url = 'https://accounts.spotify.com/api/token';

    const response = await axios.post(token_url, {grant_type:'client_credentials'}, {
      headers: { 
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded' 
      }
    })
    //return access token
    console.log("GetToken: ", response.data.access_token)
    API_TOKEN = response.data.access_token
    //return response.data.access_token
    //console.log(response.data.access_token);   
  }catch(error){
    //on fail, log the error in console
    console.log(error);
  }
}

const getSpotify = () => {
    const s = new SpotifyWebApi()
    const token = getToken()
    s.setAccessToken(token)
    return s
}

const createSearchURL = (term) => {
    return `https://api.spotify.com/v1/search?q=${term}&type=track`
}

export const findSongBySearchTerm = async (term) => {
    if (!API_TOKEN) {
        getToken()
    }
    const response = await axios.get(createSearchURL(term), {headers: {"Authorization": `Bearer ${API_TOKEN}`}})
    console.log(response.data)
    return response.data.tracks.items
}

export const findSongBySongID = async (songID) => {
    if (!API_TOKEN) {
        getToken();
    }
    const response = await axios.get(`${SEARCH_TRACK_URL}${songID}`, {headers: {"Authorization": `Bearer ${API_TOKEN}`}})
    return response.data
}