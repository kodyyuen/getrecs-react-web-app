const AddToPlaylistButton = ({ handleAddToPlaylist, url, recsLoading }) => {
  return (
    <>
      {handleAddToPlaylist && !url && (
        <button
          className="btn btn-success"
          onClick={() => handleAddToPlaylist()}
          style={{ fontSize: "1.75vh" }}
        >
          {recsLoading ? (
            <i className="fa-brands fa-spotify fa-bounce" />
          ) : (
            <>
              <i className="fa-solid fa-circle-plus me-2"></i>Add to Playlist
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
    </>
  );
};

export default AddToPlaylistButton;
