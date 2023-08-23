import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecsToPlaylistThunk,
  getSpotifyLongTopSongsThunk,
  getSpotifyMediumTopSongsThunk,
  getSpotifyProfileThunk,
  getSpotifyRecsThunk,
  getSpotifyShortTopSongsThunk,
} from "./spotify-thunks";
import SpotifyLogout from "./spotify-logout";
import { RenderSongsList } from "../songs/songs-list";
import SpotifyRecs from "./spotify-recs";

const SpotifyProfile = () => {
  const {
    spotifyProfile,
    shortTopSongs,
    mediumTopSongs,
    longTopSongs,
    recs,
    recsPlaylistURL,
    recsLoading,
  } = useSelector((state) => state.spotify);

  const [songsTime, setSongsTime] = useState("short");
  const dispatch = useDispatch();

  const timeSeeds = {
    short: shortTopSongs,
    medium: mediumTopSongs,
    long: longTopSongs,
  };

  const handleGenerateRecs = (time) => {
    if (timeSeeds[time].length !== 0) {
      const seeds = timeSeeds[time].slice(0, 5).map((song) => song.id);
      dispatch(getSpotifyRecsThunk({ seeds: seeds }));
    }
  };

  const handleAddToPlaylist = () => {
    const params = {
      user_id: spotifyProfile.id,
      body: {
        name: "GetRecs Playlist",
        public: false,
        description: `Generated on ${new Date().toLocaleString("en-US")}`,
      },
      uris: {
        uris: recs.map((s) => s.uri),
      },
    };
    dispatch(addRecsToPlaylistThunk({ params: params }));
  };

  return (
    <>
      <div className="d-flex justify-content-center">
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
      </div>
      <div className="d-flex justify-content-center mt-2">
        <button
          className="btn btn-primary"
          onClick={() => handleGenerateRecs(songsTime)}
        >
          Generate Recommendations
        </button>
      </div>
      {/* <div>
        <button
          className="btn btn-primary"
          onClick={() => handleAddToPlaylist()}
        >
          Add to Playlist
        </button>
      </div> */}
      {/* {recs.length > 0 && <RenderSongsList songs={recs} />} */}
      {recs.length > 0 && (
        <SpotifyRecs
          songs={recs}
          handleAddToPlaylist={handleAddToPlaylist}
          url={recsPlaylistURL}
          recsLoading={recsLoading}
        />
      )}
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
