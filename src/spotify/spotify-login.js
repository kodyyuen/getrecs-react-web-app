import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSpotifyProfileThunk } from "./spotify-thunks";
import { spotifyLogin } from "./spotify-service";

const SpotifyLogin = () => {
  // const SPOTIFY_API_URL = "http://localhost:4000/spotify";
  const SPOTIFY_API_URL = "https://getrecs-node-server-app-6d8abdb70e6b.herokuapp.com/spotify";
  const scopes = ["user-top-read", "playlist-modify-private"];

  const str = new URLSearchParams({
    response_type: "code",
    client_id: process.env.REACT_APP_CLIENT_ID,
    scope: scopes.join(" "),
    redirect_uri: `${process.env.REACT_APP_SITE_BASE_URL}/spotify/callback`,
    show_dialog: "true",
  });

  const [token, setToken] = useState("")

//   useEffect(() => {
//     const hash = window.location.hash
//     let token = window.localStorage.getItem("token")

//     if (!token && hash) {
//         token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

//         window.location.hash = ""
//         window.localStorage.setItem("token", token)
//     }

//     setToken(token)
//     console.log(token)
//     const hash = window.location.hash
//     let token = window.localStorage.getItem("code")
//     console.log(window.location)

//     if (!token && hash) {
//         token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

//         window.location.hash = ""
//         window.localStorage.setItem("token", token)
//     }

//     setToken(token)
//     console.log(token)

// }, [])
  
  return (
    <>
      <div className="text-center w-50 m-auto">
        <a className="btn btn-success" href={"https://accounts.spotify.com/authorize?" + str.toString()}>
          <i className="fa-brands fa-spotify pe-2" />
          Login with Spotify
        </a>
      </div>
  </>
  );
};

export default SpotifyLogin;
