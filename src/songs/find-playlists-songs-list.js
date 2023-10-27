import FindPlaylistsSongsListRow from "./find-playlists-songs-list-row";
import { useState } from "react";

export const RenderFindPlaylistsSongsList = ({ songs }) => {
  const [findSong, setFindSong] = useState("");

  return (
    <>
      <div className="row m-0">
        <div className="col-1">
          <h5 className="font-weight-bold mb-1">#</h5>
        </div>
        <div className="col col-sm-6 col-md-6 col-lg-6">
          <h5 className="font-weight-bold mb-1">Title</h5>
        </div>
        <div className="d-none d-md-block col-2">
          <h5 className="font-weight-bold mb-1">Album</h5>
        </div>
        <div className="d-none d-md-block col-sm-1 p-0">
          <h5 className="font-weight-bold mb-1">Time</h5>
        </div>
      </div>
      <div>
        <ul className="list-group pe-0">
          {songs.map((song, idx) => (
            <FindPlaylistsSongsListRow
              key={song.id}
              {...{ song, idx, findSong, setFindSong }}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
