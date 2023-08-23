import { RenderSongsList } from "../songs/songs-list";
import { useState } from "react";

const SpotifyRecs = ({ songs, handleAddToPlaylist, url }) => {
  const [expanded, setExpanded] = useState(true);
  const handleCollapse = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mt-4 mb-5">
      <div className="row">
        <div className="d-flex justify-content-between mb-1">
          <h5>{`Recs`}</h5>
          <div>
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={handleCollapse}
            >
              {expanded ? (
                <i className="fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </button>
            {!url && <button
              className="btn btn-primary"
              onClick={() => handleAddToPlaylist()}
            >
              Add to Playlist
            </button>}
            {url && <a
              className="btn btn-success"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Playlist
            </a>}
          </div>
        </div>
        <hr></hr>
      </div>
      {expanded && <RenderSongsList songs={songs} />}
    </div>
  );
};

export default SpotifyRecs;
