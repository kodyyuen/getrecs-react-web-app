import ProfileArtistsSet from "./profile-artists-set";
import SelectTracksTime from "./select-tracks-time";
import { useEffect, useState } from "react";

const ProfileArtists = ({
  shortTopArtists,
  mediumTopArtists,
  longTopArtists,
}) => {
  const [artistsTime, setArtistsTime] = useState("short");
  useEffect(() => {
    console.log("artist: " + artistsTime);
  });
  return (
    <div className="my-5">
        <h1>Top Artists</h1>
      <SelectTracksTime time={artistsTime} setTime={setArtistsTime} id={1} />
      {
        {
          short: <ProfileArtistsSet artists={shortTopArtists} />,
          medium: <ProfileArtistsSet artists={mediumTopArtists} />,
          long: <ProfileArtistsSet artists={longTopArtists} />,
        }[artistsTime]
      }
    </div>
  );
};

export default ProfileArtists;
