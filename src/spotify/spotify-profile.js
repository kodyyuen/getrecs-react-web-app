import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpotifyLongTopSongsThunk,
  getSpotifyMediumTopSongsThunk,
  getSpotifyProfileThunk,
  getSpotifyRecsThunk,
  getSpotifyShortTopSongsThunk,
} from "./spotify-thunks";
import SpotifyLogout from "./spotify-logout";
import { RenderSongsList } from "../songs/songs-list";

const SpotifyProfile = () => {
  const { spotifyProfile, shortTopSongs, mediumTopSongs, longTopSongs, shortRecs } =
    useSelector((state) => state.spotify);

  const [songsTime, setSongsTime] = useState("short");
  const dispatch = useDispatch();
  const [shortSeeds, setShortSeeds] = useState([]);

  // useEffect(() => {
  //   dispatch(getSpotifyProfileThunk());
  //   console.log(shortTopSongs);
  //   // console.log('here')
  //   // console.log(spotifyProfile);
  // }, []);
  useEffect(() => {
    if (shortTopSongs.length !== 0) {
      setShortSeeds(shortTopSongs.slice(0, 5).map(song => song.id));
    }
    // console.log(shortSeeds)
    console.log(shortRecs)
    // let test = shortTopSongs.splice(0, 5).map(song => song.id)
    // console.log(test)
  }, [])

  const handleGenerateRecs = () => {
    dispatch(getSpotifyRecsThunk({seeds: shortSeeds}));
  }

  return (
    <>
      <div className="btn-group" role="group">
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id="short"
          onClick={() => setSongsTime("short")}
        />
        <label
          className={`btn ${
            songsTime === "short" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          htmlFor="short"
        >
          Last Month
        </label>
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id="medium"
          onClick={() => setSongsTime("medium")}
        />
        <label
          className={`btn ${
            songsTime === "medium" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          htmlFor="medium"
        >
          Last 6 Months
        </label>
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id="long"
          onClick={() => setSongsTime("long")}
        />
        <label
          className={`btn ${
            songsTime === "long" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          htmlFor="long"
        >
          All Time
        </label>
      </div>
      <div>
        <button className="btn btn-primary" onClick={() => handleGenerateRecs()}>Generate Recommendations</button>
      </div>
      {/* <div>{shortRecs}</div> */}
      {shortRecs.tracks.length > 0 && <RenderSongsList songs={shortRecs.tracks}/>}
      {songsTime === "short" && <RenderSongsList songs={shortTopSongs} />}
      {songsTime === "medium" && <RenderSongsList songs={mediumTopSongs} />}
      {songsTime === "long" && <RenderSongsList songs={longTopSongs} />}
      <img
        src={spotifyProfile.images[0].url}
        className="img-fluid"
        alt="profile pic"
      />
      <div>{spotifyProfile.display_name}</div>
      <SpotifyLogout />
    </>
  );
};

export default SpotifyProfile;
