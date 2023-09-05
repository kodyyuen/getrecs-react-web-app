import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profileThunk } from "./users-thunk";
import { getSpotifyLongTopArtistsThunk, getSpotifyLongTopSongsThunk, getSpotifyMediumTopArtistsThunk, getSpotifyMediumTopSongsThunk, getSpotifyProfileThunk, getSpotifyShortTopArtistsThunk, getSpotifyShortTopSongsThunk } from "../spotify/spotify-thunks";

const CurrentUser = ({ children }) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getSpotifyProfileThunk())
  //   dispatch(getSpotifyShortTopSongsThunk());
  //   dispatch(getSpotifyMediumTopSongsThunk());
  //   dispatch(getSpotifyLongTopSongsThunk());
  //   dispatch(getSpotifyShortTopArtistsThunk());
  //   dispatch(getSpotifyMediumTopArtistsThunk());
  //   dispatch(getSpotifyLongTopArtistsThunk());
  // }, []);
  return (children);
}

export default CurrentUser;