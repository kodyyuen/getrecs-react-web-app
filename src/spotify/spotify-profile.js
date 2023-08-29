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
      <h1>Spotify Profile</h1>
      <img
        src={spotifyProfile.images[0].url}
        className="img-fluid"
        alt="profile pic"
      />
      <h1>{spotifyProfile.display_name}</h1>

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
