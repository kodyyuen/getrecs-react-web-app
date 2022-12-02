import './App.css';
import Recs from './recs/index'
import SongsSearch from './songs/songs-search';
import Users from './users';
import Profile from './users/profile';
import PublicProfile from './users/public-profile';
import Register from './users/register';
import Login from './users/login';
import Details from './songs/songs-details';
import Navigation from './navigation';
import usersReducer from './users/users-reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    users: usersReducer,
  }
})

function App() {
  return (
      <div className="container mt-4 mb-4">
          <Provider store={store}>
              <BrowserRouter>
                  <CurrentUser>
                      <Navigation/>
                      <Routes>
                          <Route index element={<Recs/>}/>
                          <Route path="/search" element={<SongsSearch/>}/>
                          <Route path="/users" element={
                              <ProtectedRoute>
                                  <Users/>
                              </ProtectedRoute>
                          }/>
                          <Route path="/login" element={<Login/>}/>
                          <Route path="/register" element={<Register/>}/>
                          <Route path="/profile" element={
                              <ProtectedRoute>
                                  <Profile/>
                              </ProtectedRoute>
                          }/>
                          <Route path="/details/:songID" element={<Details/>}/>
                          <Route path="/profile/:uid" element={<PublicProfile/>}/>
                      </Routes>
                  </CurrentUser>
              </BrowserRouter>
          </Provider>
      </div>
  );
}

export default App;
