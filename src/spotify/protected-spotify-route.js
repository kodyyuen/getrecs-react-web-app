import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import {
  getSpotifyLongTopArtistsThunk,
  getSpotifyLongTopSongsThunk,
  getSpotifyMediumTopArtistsThunk,
  getSpotifyMediumTopSongsThunk,
  getSpotifyProfileThunk,
  getSpotifyShortTopArtistsThunk,
  getSpotifyShortTopSongsThunk,
} from "./spotify-thunks";

const ProtectedSpotifyRoute = ({ children }) => {
  const { spotifyProfile, apiKey } = useSelector((state) => state.spotify);
  const dispatch = useDispatch();

  useEffect(() => {
    if (apiKey && !spotifyProfile) {
      dispatch(getSpotifyProfileThunk(apiKey));
      dispatch(getSpotifyShortTopSongsThunk(apiKey));
      dispatch(getSpotifyMediumTopSongsThunk(apiKey));
      dispatch(getSpotifyLongTopSongsThunk(apiKey));
      dispatch(getSpotifyShortTopArtistsThunk(apiKey));
      dispatch(getSpotifyMediumTopArtistsThunk(apiKey));
      dispatch(getSpotifyLongTopArtistsThunk(apiKey));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (apiKey && spotifyProfile) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedSpotifyRoute;
