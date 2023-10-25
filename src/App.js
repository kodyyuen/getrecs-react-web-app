import "./App.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Recs from "./recs/index";
import SongsSearch from "./songs/songs-search";
import Profile from "./users/profile";
import PublicProfile from "./users/public-profile";
import Register from "./users/register";
import Login from "./users/login";
import Details from "./songs/songs-details";
import Navigation from "./navigation";
import ProtectedRoute from "./users/protected-route";
import usersReducer from "./users/users-reducer";
import songsReducer from "./songs/songs-reducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import Users from "./users";
import SpotifyProfile from "./spotify/spotify-profile";
import spotifyReducer from "./spotify/spotify-reducer";
import ProtectedSpotifyRoute from "./spotify/protected-spotify-route";
import SpotifyCallback from "./spotify/spotify-callback";
import FindPlaylists from "./spotify/find-playlists-with-song";
import Playlists from "./spotify/playlists";

const store = configureStore({
  reducer: {
    users: usersReducer,
    songs: songsReducer,
    spotify: spotifyReducer,
  },
});

function App() {
  return (
    <div className="container mt-3 mb-3 px-2">
      <Provider store={store}>
        <BrowserRouter>
          {/* <CurrentUser> */}
          <Navigation />
          <Routes>
            <Route index element={<Recs />} />
            <Route path="/search" element={<SongsSearch />} />
            <Route
              path="/find-playlists"
              element={
                <ProtectedSpotifyRoute>
                  <FindPlaylists />
                </ProtectedSpotifyRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/details/:songID" element={<Details />} />
            <Route path="/profile/:uid" element={<PublicProfile />} />
            <Route path="/playlists/:songID" element={<Playlists />} />
            <Route
              path="/spotify"
              element={
                <ProtectedSpotifyRoute>
                  <SpotifyProfile />
                </ProtectedSpotifyRoute>
              }
            />
            <Route path="/spotify/callback" element={<SpotifyCallback />} />
          </Routes>
          {/* </CurrentUser> */}
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
