import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profileThunk } from "./users-thunk";
import { getSpotifyLongTopSongsThunk, getSpotifyMediumTopSongsThunk, getSpotifyProfileThunk, getSpotifyShortTopSongsThunk } from "../spotify/spotify-thunks";

const CurrentUser = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileThunk())
    dispatch(getSpotifyProfileThunk())
    dispatch(getSpotifyShortTopSongsThunk());
    dispatch(getSpotifyMediumTopSongsThunk());
    dispatch(getSpotifyLongTopSongsThunk());
  }, []);
  return (children);
}

export default CurrentUser;