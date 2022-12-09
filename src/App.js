import './App.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Recs from './recs/index'
import SongsSearch from './songs/songs-search';
import Profile from './users/profile';
import PublicProfile from './users/public-profile';
import Register from './users/register';
import Login from './users/login';
import Details from './songs/songs-details';
import Navigation from './navigation';
import CurrentUser from './users/current-user';
import ProtectedRoute from './users/protected-route';
import usersReducer from './users/users-reducer';
import apiCall from './songs/songs-service';
import { useEffect } from 'react';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import findSongBySearchTerm from './songs/songs-service';
import songsReducer from './songs/songs-reducer';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore({
    reducer: {
        users: usersReducer,
        songs: songsReducer
    }
})

//apiCall()

function App() {

    // useEffect(() => {
    //     const spotifyToken = getTokenFromUrl().access_token;
    //     console.log("Spotify Token: " + spotifyToken)
    //     const client_cred = apiCall().access_token;
    //     console.log("Client cred: " + client_cred)
    // })

    // let s = new SpotifyWebApi()
    // s.setAccessToken("BQDAkaPU_3Rne_TYZ5g-HASJYGfhWgxIR03yILgv-X18gxiFtYs7zL5Ym0Pb8KAboUJABYcOGm7iVQzg94_t20TIbkfmY2KXKRZrayaKLufDCcsKYkw")
    // s.searchTracks("wish", (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         console.log('Search result: ', data)
    //     }
    // })

    //findSongBySearchTerm()
    return (
        <div className="container mt-4 mb-4">
            <Provider store={store}>
                <BrowserRouter>
                    <CurrentUser>
                        <Navigation />
                        <Routes>
                            <Route index element={<Recs />} />
                            <Route path="/search" element={<SongsSearch />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />
                            <Route path="/details/:songID" element={<Details />} />
                            <Route path="/profile/:uid" element={<PublicProfile />} />
                        </Routes>
                    </CurrentUser>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;