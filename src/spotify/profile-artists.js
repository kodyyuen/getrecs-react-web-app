import CardSet from "./card-set";
import SelectTracksTime from "./select-tracks-time";
import { useState } from "react";
import SongListHeader from "./song-list-header";
import { useSelector } from "react-redux";

const ProfileArtists = () => {
  const { shortTopArtists, mediumTopArtists, longTopArtists } = useSelector(
    (state) => state.spotify
  );
  const [artistsTime, setArtistsTime] = useState("short");
  const [artistsExpanded, setArtistsExpanded] = useState(true);
  const expandList = (artists) => {
    return artists.slice(0, artistsExpanded ? 5 : 10);
  };

  return (
    <div className="my-5 p-1">
      <h1 className="mb-4">Top Artists</h1>
      <SongListHeader
        col2={
          <SelectTracksTime
            time={artistsTime}
            setTime={setArtistsTime}
            id={"artists"}
          />
        }
        expanded={artistsExpanded}
        setExpanded={setArtistsExpanded}
      />
      {
        {
          short: <CardSet set={expandList(shortTopArtists)} type={'artist'} />,
          medium: <CardSet set={expandList(mediumTopArtists)} type={'artist'} />,
          long: <CardSet set={expandList(longTopArtists)} type={'artist'} />,
        }[artistsTime]
      }
    </div>
  );
};

export default ProfileArtists;
