import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { getRecommendationsByLikedSongsThunk, getRecommendationsByGenresAndSaveThunk, deleteRecommendationsThunk } from "../users/users-thunk";
import { getGenresThunk, getRecommendationsByGenresThunk } from "../songs/songs-thunks";
import {
  getAlbumName,
  getArtistName,
  getDuration,
  getImage,
  getSongID,
  getSongLink,
  getSongName,
} from "../songs/songs-helpers";

const Recs = () => {
  const [recMethod, setRecMethod] = useState("genres");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { currentUser } = useSelector(state => state.users);
  const { genres, tempRecs } = useSelector(state => state.songs);
  const dispatch = useDispatch();
  const LOGIN_TOOLTIP = "Log in to generate recommendations based on liked songs.";

  useEffect(() => { // fetch genres if not already available
    if (genres.length === 0) {
      dispatch(getGenresThunk());
    }
  }, []);

  const handleGetRecsByGenres = () => {
    if (selectedGenres.length === 0) {
      alert('You must select at least one genre before recommendations can be generated.');
    } else {
      if (currentUser) {
        dispatch(getRecommendationsByGenresAndSaveThunk(selectedGenres));
      } else {
        dispatch(getRecommendationsByGenresThunk(selectedGenres));
      }
    }
  }

  const handleGetRecsByLikedSongs = () => {
    if (currentUser.likes.length === 0) {
      alert('You must like at least one song before recommendations can be generated based on likes.');
    } else {
      // use five random tracks from the user's list of liked tracks to seed recs
      let seedTracks = [];
      if (currentUser.likes.length >= 5) {
        const shuffledLikes = [...currentUser.likes].sort((a, b) => 0.5 - Math.random())
        seedTracks = shuffledLikes.slice(0, 5);
      } else {
        seedTracks = currentUser.likes;
      }

      dispatch(getRecommendationsByLikedSongsThunk(seedTracks));
    }
  }

  const handleClearRecommendations = () => {
    dispatch(deleteRecommendationsThunk());
  }

  const handleSelectGenres = (e) => {
    const newSelectedGenres = [...e.target.options]
      .filter(({ selected }) => selected)
      .map(({ value }) => value);
    setSelectedGenres(newSelectedGenres);
  }



  return (
    <>
      <Tooltip anchorId="by-likes-disabled" place="top" />

      <h1>GetRecs!</h1>

      <div className="btn-group" role="group">
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id="by-genres"
          onClick={() => setRecMethod("genres")}
        />
        <label className={`btn ${recMethod === "genres" ? "btn-secondary" : "btn-outline-secondary"}`} htmlFor="by-genres">
          By Selected Genres
        </label>
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id="by-liked-songs"
          onClick={() => setRecMethod("songs")}
          disabled={!currentUser}
        />
        <label className={`btn ${recMethod === "songs" ? "btn-secondary" : "btn-outline-secondary"}`} htmlFor="by-liked-songs">
          By Liked Songs
        </label>
      </div>

      {recMethod === "genres" &&
        <>
          {!currentUser && <i className="fa-solid fa-circle-info ms-2" id="by-likes-disabled" data-tooltip-content={LOGIN_TOOLTIP}></i>}
          <br />

          <h5 className="mt-3">{"Select one or more genres"}</h5>
          <p>
            Select multiple options by holding Ctrl/Cmd and clicking. A maximum of five genres can be selected.
          </p>
          <span>
            Selected genres:
          </span>
          {selectedGenres && selectedGenres.map((genre, idx) =>
            <span className="badge rounded-pill text-bg-info m-1" key={idx}>{genre}</span>
          )}

          <select multiple className="form-select mt-1" onChange={e => handleSelectGenres(e)} disabled={selectedGenres.length >= 5}>
            {genres && genres.map((genre, idx) =>
              <option value={genre} key={idx}>{genre}</option>
            )}
          </select>
        </>}

      <button type="button" className="btn btn-primary mt-3 d-block"
        onClick={recMethod === "genres" ? handleGetRecsByGenres : handleGetRecsByLikedSongs}>
        Generate Recommendations
      </button>

      {currentUser ? (
        <div className="row mt-5">
          <h3>Recently Recommended Songs</h3>
          <div className="col">
            <ul className="list-group">
              {currentUser.recommendations.map((song, idx) =>
                <li key={idx} className="list-group-item p-2">
                  <div className="row">
                    <div className="col-1">
                      <a href={getSongLink(song)} target="_blank" rel="noreferrer"><img src={getImage(song)} height={100} alt="song art" /></a>
                    </div>
                    <div className="col-7 ps-5">
                      <Link to={`/details/${getSongID(song)}`}>
                        {getSongName(song)} - {getArtistName(song)}
                      </Link>
                    </div>
                    <div className="col-3">{getAlbumName(song)}</div>
                    <div className="col-1">{getDuration(song)}</div>
                  </div>
                </li>
              )}
              <button type="button" className="list-group-item list-group-item-action" onClick={handleClearRecommendations}>
                Clear recommendation history
              </button>
            </ul>
          </div>
        </div>
      ) : (
        <div className="row mt-5">
          {tempRecs.length > 0 &&
            <>
              <h3>Recommendations</h3>
              <p>Log in to save your recommendations.</p>
              <div className="col">
                <ul className="list-group">
                  {tempRecs.map((song, idx) =>
                    <li key={idx} className="list-group-item p-2">
                      <div className="row">
                        <div className="col-1">
                          <a href={getSongLink(song)} target="_blank" rel="noreferrer"><img src={getImage(song)} height={100} alt="song art" /></a>
                        </div>
                        <div className="col-7 ps-5">
                          <Link to={`/details/${getSongID(song)}`}>
                            {getSongName(song)} - {getArtistName(song)}
                          </Link>
                        </div>
                        <div className="col-3">{getAlbumName(song)}</div>
                        <div className="col-1">{getDuration(song)}</div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </>
          }
          {tempRecs.length === 0 &&
            <>
              <p>Generate recommendations above to see them here!</p>
            </>
          }
        </div>
      )}
    </>
  )
}

export default Recs;