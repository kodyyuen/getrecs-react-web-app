import SelectTracksTime from "./select-tracks-time";
import SongListHeader from "./song-list-header";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpotifyRecsThunk, addRecsToPlaylistThunk } from "./spotify-thunks";
import { RenderSongsList } from "../songs/songs-list";
import SpotifyRecs from "./spotify-recs";

const ProfileSongs = ({
  shortTopSongs,
  mediumTopSongs,
  longTopSongs,
  recs,
  spotifyProfile,
  recsPlaylistURL,
  recsLoading,
}) => {
  const [songsTime, setSongsTime] = useState("short");
  const [songsExpanded, setSongsExpanded] = useState(true);
  const dispatch = useDispatch();
  const timeSeeds = {
    short: shortTopSongs,
    medium: mediumTopSongs,
    long: longTopSongs,
  };

  const handleGenerateRecs = (time) => {
    if (timeSeeds[time].length !== 0) {
      const seeds = timeSeeds[time].slice(0, 5).map((song) => song.id);
      dispatch(getSpotifyRecsThunk({ seeds: seeds }));
    }
  };

  const handleAddToPlaylist = () => {
    const params = {
      user_id: spotifyProfile.id,
      body: {
        name: "GetRecs Playlist",
        public: false,
        description: `Generated on ${new Date().toLocaleString("en-US")}`,
      },
      uris: {
        uris: recs.map((s) => s.uri),
      },
    };
    dispatch(addRecsToPlaylistThunk({ params: params }));
  };

  useEffect(() => {
    console.log("song: " + songsTime);
  });

  return (
    <div className="pt-5">
        <h1>Top Songs</h1>
      <div className="d-flex justify-content-around">
        <SelectTracksTime time={songsTime} setTime={setSongsTime} id={3} />
        <button
          className="btn btn-primary"
          onClick={() => handleGenerateRecs(songsTime)}
        >
          Generate Recommendations
        </button>
      </div>
      <div className="row justify-content-between">
        <div className="row w-50">
          <div className="mt-4 mb-5">
            <SongListHeader
              name={"Songs"}
              expanded={songsExpanded}
              setExpanded={setSongsExpanded}
            />
            {songsExpanded &&
              {
                short: <RenderSongsList songs={shortTopSongs} />,
                medium: <RenderSongsList songs={mediumTopSongs} />,
                long: <RenderSongsList songs={longTopSongs} />,
              }[songsTime]}
          </div>
        </div>
        <div className="row w-50">
          {recs.length > 0 && (
            <SpotifyRecs
              songs={recs}
              handleAddToPlaylist={handleAddToPlaylist}
              url={recsPlaylistURL}
              recsLoading={recsLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSongs;
