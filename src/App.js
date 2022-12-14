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
import songsReducer from './songs/songs-reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Users from './users';

const store = configureStore({
    reducer: {
        users: usersReducer,
        songs: songsReducer
    }
})

function App() {
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
                            <Route path="/users" element={<Users />} />
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