import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

const Recs = () => {
  const { currentUser } = useSelector((state) => state.users);
  const TOOLTIP_MSG = currentUser
    ? "Recommendations will be generated based on your liked songs."
    : "Recommendations will be generated based on selected genres. Log in to generate recommendations based on liked songs."

  const handleGetRecsAnonUser = () => {
    console.log('get recs for anon')
  }
  const handleGetRecsLoggedInUser = () => {
    console.log(`get recs for ${currentUser.username}`)
  }
  const handleClearRecommentations = () => { }

  return (
    <>
      <h1>GetRecs!</h1>

      <button type="button" className="btn btn-primary"
        onClick={currentUser ? handleGetRecsLoggedInUser : handleGetRecsAnonUser}>
        Generate Recommendations
      </button>

      <Tooltip anchorId="generate-recs-info" place="top"/>
      <i className="fa-solid fa-circle-info ms-2" id="generate-recs-info" data-tooltip-content={TOOLTIP_MSG}></i>

      {currentUser ? (
        <div className="row mt-5">
          <h3>Recently Recommended Songs</h3>
          <div className="col">
            <ul className="list-group">
              {/* {likedBy.map((user, index) =>
                <li className="list-group-item" key={index}>
                  {user.username}
                </li>
              )} */}
              <li className="list-group-item">Placeholder Song 1</li>
              <li className="list-group-item">Placeholder Song 2</li>
              <li className="list-group-item">Placeholder Song 3</li>
              <button type="button" class="list-group-item list-group-item-action" onClick={handleClearRecommentations}>
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
          <h5 className="mt-4">Login to save your recommendations.</h5>
        </div>
      )}
    </>
  )
}

export default Recs;