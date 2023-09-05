import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { getApiKeyThunk } from "./spotify-thunks";

const SpotifyCallback = () => {
  const [token, setToken] = useState("");
  const { apiKey } = useSelector((state) => state.spotify);
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     console.log(window.location.search.split("=")[1]);
  //     // window.location.redirect("http://localhost:3000/spotify")
  //     // if (!token && hash) {
  //     //   token = hash
  //     //     .substring(1)
  //     //     .split("&")
  //     //     .find((elem) => elem.startsWith("access_token"))
  //     //     .split("=")[1];

  //     //   window.location.hash = "";
  //     //   window.localStorage.setItem("token", token);
  //     // }

  //     // setToken(token);
  //     // console.log(token)
  //   }, []);
  // if (window.location.search) {
  //   dispatch(getApiKeyThunk(window.location.search.split("=")[1]));
  //   console.log("here: " + window.location.search.split("=")[1]);
  // }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("callback 1: " + code);
    dispatch(getApiKeyThunk(code));
  }, []);
  // const urlParams = new URLSearchParams(window.location.search);
  // const code = urlParams.get("code");
  // if (code) {
  //   console.log("callback 1");
  //   dispatch(getApiKeyThunk(code));
  // }
  if (apiKey) {
    console.log("callback 2");
    return <Navigate to={"/spotify"} />;
  }
  return <>Loading...</>;
  // console.log('myParam1: ' + myParam)
  // if (myParam) {
  //   dispatch(getApiKeyThunk(myParam));
  //   console.log('myParam2: ' + myParam)
  // }
  // if (api)

  // return <Navigate to={"/spotify"} />;
};

export default SpotifyCallback;
