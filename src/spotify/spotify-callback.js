import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getApiKeyThunk } from "./spotify-thunks";

const SpotifyCallback = () => {
  const { apiKey } = useSelector((state) => state.spotify);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    dispatch(getApiKeyThunk(code));
    // eslint-disable-next-line
  }, []);

  if (apiKey) {
    return <Navigate to={"/spotify"} />;
  }
};

export default SpotifyCallback;
