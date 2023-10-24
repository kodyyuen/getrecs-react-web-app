import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RenderFindPlaylistsSongsList } from "../songs/find-playlists-songs-list";
import { findSongBySearchTermThunk } from "../songs/songs-thunks";

const FindPlaylists = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { songs } = useSelector((state) => state.songs);
  const { foundPlaylists } = useSelector((state) => state.spotify);

  const dispatch = useDispatch();
  useEffect(() => {
    if (searchTerm !== "") {
      dispatch(findSongBySearchTermThunk(searchTerm));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* <button
        onClick={() =>
          dispatch(findPlaylistsWithSongThunk({ findSong, apiKey }))
        }
      >
        Find Playlists
      </button> */}
      {foundPlaylists.length > 0 &&
        foundPlaylists.map((p) => {
          return (
            <div>
              <a href={p.external_urls.spotify}>{p.name}</a>
            </div>
          );
        })}
      {songs && (
        <RenderFindPlaylistsSongsList songs={songs} />
      )}
    </div>
  );
};

export default FindPlaylists;
