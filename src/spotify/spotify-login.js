import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpotifyProfileThunk } from "./spotify-thunks";
import { spotifyLogin } from "./spotify-service";

const SpotifyLogin = () => {
  // const SPOTIFY_API_URL = "http://localhost:4000/spotify";
  const SPOTIFY_API_URL = "https://getrecs-node-server-app-6d8abdb70e6b.herokuapp.com/spotify";
  return (
    <>
      <div className="text-center w-50 m-auto">
        <a className="btn btn-success" href={SPOTIFY_API_URL}>
          <i className="fa-brands fa-spotify pe-2" />
          Login with Spotify
        </a>
      </div>
    
    
    <div className="text-center w-50 m-auto">
      <button className="btn btn-success" onClick={() => spotifyLogin}>
        <i className="fa-brands fa-spotify pe-2" />
        Login with Spotify
      </button>
    </div>
  </>
  );
};

export default SpotifyLogin;
