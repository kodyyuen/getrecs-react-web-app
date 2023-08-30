import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecsToPlaylistThunk,
  getSpotifyLongTopSongsThunk,
  getSpotifyMediumTopSongsThunk,
  getSpotifyProfileThunk,
  getSpotifyRecsThunk,
  getSpotifyShortTopSongsThunk,
} from "./spotify-thunks";
import { RenderSongsList } from "../songs/songs-list";
import SpotifyRecs from "./spotify-recs";
import SelectTracksTime from "./select-tracks-time";
import SongListHeader from "./song-list-header";
import ArtistCard from "./artist-card";
import ProfileArtists from "./profile-artists";
import ProfileSongs from "./profile-songs";

const SpotifyProfile = () => {
  const {
    spotifyProfile,
    shortTopSongs,
    mediumTopSongs,
    longTopSongs,
    shortTopArtists,
    mediumTopArtists,
    longTopArtists,
    recs,
    recsPlaylistURL,
    recsLoading,
  } = useSelector((state) => state.spotify);

  const [songsTime, setSongsTime] = useState("short");
  const [artistsTime, setArtistsTime] = useState("short");
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

  return (
    <>
      <div className="row mt-3">
        <div className="col-5 col-md-3">
          <img
            src={spotifyProfile.images[1].url}
            className="img-fluid rounded-circle border border-3 border-success"
            alt="profile pic"
          />
        </div>
        <div className="col-7 col-md-9">
          <h5>Spotify Profile</h5>
          <h1 className="display-1 fw-bold">{spotifyProfile.display_name}</h1>
        </div>
      </div>

      <ProfileArtists
        {...{ shortTopArtists, mediumTopArtists, longTopArtists }}
      />

      <ProfileSongs
        {...{
          shortTopSongs,
          mediumTopSongs,
          longTopSongs,
          recs,
          spotifyProfile,
          recsPlaylistURL,
          recsLoading,
        }}
      />
    </>
  );
};

export default SpotifyProfile;
