import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpotifyProfileThunk } from "./spotify-thunks";

const SpotifyLogin = () => {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const clientId = "9534d135519d4b049b481e8bc6862e40";
  const redirectUri = "http://localhost:3000/profile";
  const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
  ];

  // const { spotifyProfile } = useSelector((state) => state.spotify);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotifyProfileThunk());
  }, []);

  return (
    <>
      <div className="text-center w-50 m-auto">
        <a className="btn btn-success" href="http://localhost:4000/spotify">
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
