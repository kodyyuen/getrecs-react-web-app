import { RenderSongsList } from "../songs/songs-list";
import { useState } from "react";
import SongListHeader from "./song-list-header";

const SpotifyRecs = ({ songs, handleAddToPlaylist, url, recsLoading }) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="mt-4 mb-5">
      <SongListHeader name={"Recs"} {...{ expanded, setExpanded }} />
      {expanded && <RenderSongsList songs={songs} />}
    </div>
  );
};

export default SpotifyRecs;
