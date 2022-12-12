import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { getRecommendationsByLikedSongsThunk } from "../users/users-thunk";
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
  const { currentUser } = useSelector(state => state.users);
  const dispatch = useDispatch();
  // TODO: update this, logged in users without any liked songs can't get recs from liked songs
  const TOOLTIP_MSG = currentUser
    ? "Recommendations will be generated based on your liked songs."
    : "Recommendations will be generated based on selected genres. Log in to generate recommendations based on liked songs."

  const handleGetRecsAnonUser = () => {
    console.log('get recs for anon')
  }
  const handleGetRecsLoggedInUser = () => {
    // the spotify recommendations endpoint can be seeded with up to five tracks, we're using five random tracks from the user's list of liked tracks
    let seedTracks = [];
    if (currentUser.likes.length >= 5) {
      const shuffledLikes = [...currentUser.likes].sort((a, b) => 0.5 - Math.random())
      seedTracks = shuffledLikes.slice(0, 5);
    } else {
      seedTracks = currentUser.likes;
    }

    dispatch(getRecommendationsByLikedSongsThunk(seedTracks));
  }
  const handleClearRecommentations = () => { }

  return (
    <>
      <h1>GetRecs!</h1>

      <button type="button" className="btn btn-primary"
        onClick={currentUser && currentUser.likes.length > 0 ? handleGetRecsLoggedInUser : handleGetRecsAnonUser}>
        Generate Recommendations
      </button>

      <Tooltip anchorId="generate-recs-info" place="top"/>
      <i className="fa-solid fa-circle-info ms-2" id="generate-recs-info" data-tooltip-content={TOOLTIP_MSG}></i>

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
              <button type="button" className="list-group-item list-group-item-action" onClick={handleClearRecommentations}>
                Clear recommendation history
              </button>
            </ul>
          </div>
        </div>
      ) : (
        <div className="row mt-5">
          <h3>Top recommended songs:</h3>
          <div className="col">
            <ul className="list-group">
              <li className="list-group-item">Placeholder Song 1</li>
              <li className="list-group-item">Placeholder Song 2</li>
              <li className="list-group-item">Placeholder Song 3</li>
            </ul>
          </div>
          <h5 className="mt-4">Log in to save your recommendations.</h5>
        </div>
      )}
    </>
  )
}

export default Recs;