import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { loginThunk } from "./users-thunk";
import SpotifyLogin from "../spotify/spotify-login";

const Login = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { spotifyProfile } = useSelector((state) => state.spotify);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLoginBtn = () => {
    try {
      dispatch(loginThunk({ username, password }));
    } catch (e) {
      alert("Invalid login");
    }
  };
  if (currentUser) {
    return <Navigate to={"/profile"} />;
  }
  if (Object.keys(spotifyProfile).length > 0) {
    return <Navigate to={"/spotify"} />;
  }
  return (
    <>
      {/* Medium - XLarge screen size */}
      <div className="d-flex flex-column align-items-center d-none d-md-block">
        <h1 className="text-center mt-2 mb-4">Login</h1>
        <form
          className="mb-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLoginBtn();
          }}
        >
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="form-control mb-3 w-50 m-auto"
            placeholder="username"
            value={username}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3 w-50 m-auto"
            placeholder="password"
            type="password"
            value={password}
          />
          <div className="d-flex">
            <button className="btn btn-primary w-25 m-auto">Login</button>
          </div>
        </form>
      </div>

      {/* XSmall - Small screen size */}
      <div className="flex-column align-items-center d-sm-block d-md-none">
        <h1 className="text-center mt-2 mb-4">Login</h1>
        <form
          className="mb-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLoginBtn();
          }}
        >
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="form-control mb-3"
            placeholder="username"
            value={username}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
            placeholder="password"
            type="password"
            value={password}
          />
          <div className="d-flex">
            <button className="btn btn-primary w-50 m-auto">Login</button>
          </div>
        </form>
      </div>
      <SpotifyLogin />
    </>
  );
};

export default Login;
