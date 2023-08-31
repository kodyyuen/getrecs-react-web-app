import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpotifyProfileThunk } from "./spotify-thunks";

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
      {/* <a className="btn btn--loginApp-link" href="http://localhost:4000/spotify">
            Login to Spotify
        </a> */}
      {/* <a
        className="btn btn--loginApp-link"
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          "%20"
        )}&response_type=token&show_dialog=true`}
      >
        Login to Spotify
      </a> */}
    </>
  );
};

export default SpotifyLogin;
