import { RenderSongsList } from "../songs/songs-list";
import { useState } from "react";
import SongListHeader from "./song-list-header";

const SpotifyRecs = ({ songs, handleAddToPlaylist, url, recsLoading }) => {
  const [expanded, setExpanded] = useState(true);
  const handleCollapse = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mt-4 mb-5">
      <SongListHeader name={'Recs'} {...{expanded, setExpanded, handleAddToPlaylist, url, recsLoading}}/>
      {expanded && <RenderSongsList songs={songs} />}
    </div>
  );
};

export default SpotifyRecs;
