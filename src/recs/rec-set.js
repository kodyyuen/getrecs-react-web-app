import { useState } from "react";
import { useDispatch } from "react-redux";
import { RenderSongsList } from "../songs/songs-list";
import { deleteRecSetThunk } from "../users/users-thunk";

const RecSet = ({ rec }) => {
  const [expanded, setExpanded] = useState(true);
  const dispatch = useDispatch();

  const handleCollapse = () => {
    setExpanded(!expanded);
  }

  const handleClear = () => {
    dispatch(deleteRecSetThunk(rec.timeStamp));
  }

  return (
    <div className="mt-4 mb-5">
      <div className="row">
        <div className="d-flex justify-content-between mb-1">
          <h5>{`Generated on ${rec.timeStamp}`}</h5>
          <div>
            <button type="button" className="btn btn-sm btn-outline-primary me-2" onClick={handleCollapse}>
              {expanded
                ? <i className="fa-solid fa-chevron-up"></i>
                : <i className="fa-solid fa-chevron-down"></i>
              }
            </button>
            <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleClear}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
        <hr></hr>
      </div>
      {expanded && <RenderSongsList songs={rec.songs} />}
    </div>
  );
}

export default RecSet;