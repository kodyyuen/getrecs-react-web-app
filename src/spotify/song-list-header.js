const SongListHeader = ({ col1, col2, expanded, setExpanded }) => {
  return (
    <div className="row m-0">
      <div className="d-flex justify-content-between mb-2 px-1">
        <div className={col1 ? "col-auto" : "col-2"}>{col1}</div>
        <div className="col-auto">{col2}</div>
        <div className="col-2 d-flex align-items-center justify-content-end">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </button>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default SongListHeader;
