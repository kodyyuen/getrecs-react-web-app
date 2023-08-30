const SongListHeader = ({name, expanded, setExpanded, handleAddToPlaylist, url, recsLoading}) => {
  return (
    <div className="row m-0">
      <div className="d-flex justify-content-between mb-1">
        <h5>{name}</h5>
        <div>
          <button
            type="button"
            className="btn btn-outline-primary me-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </button>
          {handleAddToPlaylist && !url && (
            <button
              className="btn btn-success"
              onClick={() => handleAddToPlaylist()}
            >
              {recsLoading ? (
                <i className="fa-brands fa-spotify fa-bounce" />
              ) : (
                <>
                  <i className="fa-solid fa-circle-plus me-2"></i>Add to
                  Playlist
                </>
              )}
            </button>
          )}
          {handleAddToPlaylist && url && (
            <a
              className="btn btn-primary"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-regular fa-circle-check me-2" />
              {`View Playlist`}
            </a>
          )}
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default SongListHeader;
