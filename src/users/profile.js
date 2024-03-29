import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "./users-thunk";
import { RenderSongsList } from "../songs/songs-list";
import RecSet from "../recs/rec-set";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [hideLikes, setHideLikes] = useState(false);
  const [hideRecs, setHideRecs] = useState(false);

  const handleUpdateName = (newName) => {
    dispatch(updateUserThunk({ name: newName }));
  };

  return (
    <>
      <div className="row">
        <h3 className="col">Private Profile</h3>
      </div>
      {
        <>
          <h1>{currentUser.username}</h1>
          <h4>
            {`${currentUser.likes.length} liked ${
              currentUser.likes.length === 1 ? "song" : "songs"
            }`}{" "}
            &#x2022;{" "}
            {`${currentUser.recommendations.length} ${
              currentUser.recommendations.length === 1 ? "rec" : "recs"
            }`}
          </h4>
        </>
      }
      <div className="row mt-3 mb-5">
        <label htmlFor="name">Name (Optional)</label>
        <input
          id="name"
          onChange={(e) => handleUpdateName(e.target.value)}
          className="form-control w-50"
          placeholder="Your name"
          value={currentUser.name}
        />
      </div>
      {currentUser && (
        <>
          <div className="d-flex justify-content-between">
            <h2>Likes</h2>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-primary me-2"
                onClick={() => setHideLikes(!hideLikes)}
              >
                {hideLikes ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>
          </div>
          {!hideLikes && <RenderSongsList songs={currentUser.likesData} />}

          <div className="d-flex justify-content-between mt-5">
            <h2>Recommendations</h2>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-primary me-2"
                onClick={() => setHideRecs(!hideRecs)}
              >
                {hideRecs ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>
          </div>
          {!hideRecs &&
            [...currentUser.recommendations]
              .reverse()
              .map((recSet, idx) => <RecSet rec={recSet} key={idx} />)}
        </>
      )}
    </>
  );
};
export default Profile;
