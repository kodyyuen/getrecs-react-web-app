import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { getRecommendationsByLikedSongsThunk, getRecommendationsByGenresAndSaveThunk, deleteRecommendationsThunk } from "../users/users-thunk";
import { getGenresThunk, getRecommendationsByGenresThunk, getTopTenSongsThunk } from "../songs/songs-thunks";
import { RenderSongsList } from "../songs/songs-list";
import RecSet from "./rec-set";

const Recs = () => {
    const [recMethod, setRecMethod] = useState("genres");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [generatedNewRecs, setGeneratedNewRecs] = useState(false);
    const [hideRecs, setHideRecs] = useState(false);
    const { currentUser } = useSelector(state => state.users);
    const { genres, tempRecs, topTenSongs } = useSelector(state => state.songs);
    const dispatch = useDispatch();

    const LOGIN_TOOLTIP = "Log in to generate recommendations based on liked songs.";
    const shouldShowPrevRecs = () => currentUser && (!generatedNewRecs && currentUser.recommendations.length > 0) || (generatedNewRecs && currentUser.recommendations.length > 1);

    useEffect(() => { // fetch genres + topTen if not already available
        if (genres.length === 0) {
            dispatch(getGenresThunk());
        }
        if (topTenSongs.length === 0) {
            dispatch(getTopTenSongsThunk());
        }
    }, []);

    const handleGetRecsByGenres = () => {
        if (selectedGenres.length === 0) {
            alert('You must select at least one genre before recommendations can be generated.');
        } else {
            setGeneratedNewRecs(true);
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
            setGeneratedNewRecs(true);
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

            <h1 className="text-center mb-5 mt-4">GetRecs!</h1>

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

                    <select
                        multiple
                        className="form-select mt-1"
                        onChange={e => handleSelectGenres(e)}
                        disabled={selectedGenres.length >= 5}
                    >
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
                    {generatedNewRecs && currentUser.recommendations.length > 0 ? (
                        <>
                            <h3>Recommendations</h3>
                            <div className="col">
                                <ul className="list-group">
                                    <RenderSongsList songs={currentUser.recommendations.at(-1).songs} />
                                </ul>
                            </div>
                        </>
                    ) : (
                      <div className="mb-4">
                        <p>Generate recommendations above to see them here!</p>
                      </div>
                    )}
                    {shouldShowPrevRecs() &&
                        <>
                            <div className="d-flex justify-content-between">
                                <h4>Previously Recommended</h4>
                                <div>
                                    <button type="button" className="btn btn-sm btn-outline-primary me-2" onClick={() => setHideRecs(!hideRecs)}>
                                        {hideRecs ? 'Show' : 'Hide'}
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleClearRecommendations}>
                                        Delete All
                                    </button>
                                </div>
                            </div>
                            {!hideRecs &&
                                <div className="container">

                                    <ul className="list-group">
                                        {generatedNewRecs ? (
                                            currentUser.recommendations.slice(0, -1).reverse().map((recSet, idx) =>
                                                <RecSet rec={recSet} key={idx} />
                                            )
                                        ) : (
                                            [...currentUser.recommendations].reverse().map((recSet, idx) =>
                                                <RecSet rec={recSet} key={idx} />
                                            )
                                        )}
                                    </ul>
                                </div>
                            }
                        </>
                    }
                </div>
            ) : (
                <div className="row mt-5">
                    {tempRecs.length > 0 &&
                        <>
                            <h3>Recommendations</h3>
                            <p>Log in to save your recommendations.</p>
                            <div className="col">
                                <ul className="list-group">
                                    {
                                        <RenderSongsList songs={tempRecs} />
                                    }
                                </ul>
                            </div>
                        </>
                    }
                    {tempRecs.length === 0 &&
                        <div className="mb-2">
                            <p>Generate recommendations above to see them here!</p>
                        </div>
                    }
                </div>
            )}

            <h2 className="mt-3">Top 10 Recommended Songs</h2>
            <div className="row ms-4 me-2">
                <div className="col">
                    <h6 className="font-weight-bold mb-1 mt-3">Track</h6>
                </div>
                <div className="col">
                    <h6 className="font-weight-bold mb-1 mt-3 text-end"># of Recs</h6>
                </div>
            </div>
            <ol className="list-group list-group-numbered">
                {topTenSongs.map((song, idx) =>
                    <li key={idx} className="list-group-item d-flex justify-content-between">
                        <div className="ms-2 me-auto fw-bold">
                            <Link to={`/details/${song.songID}`}>
                                {song.title} - {song.artists[0].name}
                            </Link>
                        </div>
                        <div className="me-5">{song.numberOfRecs}</div>
                    </li>
                )}
            </ol>
        </>
    )
}

export default Recs;