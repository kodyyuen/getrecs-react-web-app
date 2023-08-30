import ProfileArtistsSet from "./profile-artists-set";
import SelectTracksTime from "./select-tracks-time";
import { useEffect, useState } from "react";
import SongListHeader from "./song-list-header";

const ProfileArtists = ({
  shortTopArtists,
  mediumTopArtists,
  longTopArtists,
}) => {
  const [artistsTime, setArtistsTime] = useState("short");
  const [artistsExpanded, setArtistsExpanded] = useState(true);
  const expandList = (artists) => {
    return artists.slice(0, artistsExpanded ? 5 : 10);
  };

  return (
    <div className="my-5 p-1">
      <h1>Top Artists</h1>
      <SelectTracksTime
        time={artistsTime}
        setTime={setArtistsTime}
        id={"artists"}
      />
      <SongListHeader
        expanded={artistsExpanded}
        setExpanded={setArtistsExpanded}
      />
      {
        {
          short: <ProfileArtistsSet artists={expandList(shortTopArtists)} />,
          medium: <ProfileArtistsSet artists={expandList(mediumTopArtists)} />,
          long: <ProfileArtistsSet artists={expandList(longTopArtists)} />,
        }[artistsTime]
      }
    </div>
  );
};

export default ProfileArtists;
