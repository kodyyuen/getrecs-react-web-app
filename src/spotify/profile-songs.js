import SelectTracksTime from "./select-tracks-time";
import SongListHeader from "./song-list-header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotifyRecsThunk, addRecsToPlaylistThunk } from "./spotify-thunks";
import { RenderSongsList } from "../songs/songs-list";
import AddToPlaylistButton from "./add-to-playlist-button";

const ProfileSongs = () => {
  const {
    spotifyProfile,
    shortTopSongs,
    mediumTopSongs,
    longTopSongs,
    recs,
    recsPlaylistURL,
    recsLoading,
    apiKey,
  } = useSelector((state) => state.spotify);
  const [songsTime, setSongsTime] = useState("short");
  const [songsExpanded, setSongsExpanded] = useState(true);
  const dispatch = useDispatch();
  const timeSeeds = {
    short: shortTopSongs,
    medium: mediumTopSongs,
    long: longTopSongs,
  };

  const [expanded, setExpanded] = useState(true);

  const handleGenerateRecs = (time) => {
    if (timeSeeds[time].length !== 0) {
      const seeds = timeSeeds[time].slice(0, 5).map((song) => song.id);
      dispatch(getSpotifyRecsThunk({ seeds, apiKey }));
    }
    setExpanded(true);
  };

  const handleAddToPlaylist = () => {
    setExpanded(true);
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
      apiKey,
    };
    dispatch(addRecsToPlaylistThunk(params));
  };

  useEffect(() => {
    setSongsExpanded(true);
  }, [songsTime]);

  return (
    <div className="pt-5 px-1">
      <div className="row justify-content-between px-1">
        <div className="col-md-12 col-lg-6 order-2 order-lg-1 p-1">
          <h1>Top Songs</h1>
          <div className="mt-4 mb-5 p-0">
            <SongListHeader
              col2={
                <SelectTracksTime
                  time={songsTime}
                  setTime={setSongsTime}
                  id={"songs"}
                />
              }
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
        <div className="col-md-12 col-lg-6 order-1 order-lg-2 p-1">
          <h1>Recs</h1>
          {
            <div className="mt-4 mb-5">
              <SongListHeader
                col1={
                  <button
                    className="btn btn-primary m-0"
                    onClick={() => handleGenerateRecs(songsTime)}
                    style={{ fontSize: "1.75vh" }}
                  >
                    Generate Recs
                  </button>
                }
                col2={
                  <AddToPlaylistButton
                    handleAddToPlaylist={handleAddToPlaylist}
                    url={recsPlaylistURL}
                    recsLoading={recsLoading}
                  />
                }
                {...{
                  expanded,
                  setExpanded,
                }}
              />
              {expanded && <RenderSongsList songs={recs} />}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileSongs;
