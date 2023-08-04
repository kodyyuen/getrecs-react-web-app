import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RenderSongsList } from "./songs-list";
import { findSongBySearchTermThunk } from "./songs-thunks";

const SongsSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { songs } = useSelector((state) => state.songs);

  const dispatch = useDispatch();
  useEffect(() => {
    if (searchTerm !== "") {
      dispatch(findSongBySearchTermThunk(searchTerm));
    }
  }, []);

  return (
    <div className="container p-1 me-1">
      <h1>Search</h1>
      <form
        className="form-inline mb-5"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(findSongBySearchTermThunk(searchTerm));
        }}
      >
        <div className="input-group">
          <input
            className="form-control"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
            placeholder="Search for a track"
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      {songs && <RenderSongsList songs={songs} />}
    </div>
  );
};

export default SongsSearch;
