import { useSelector } from "react-redux";
import ProfileArtists from "./profile-artists";
import ProfileSongs from "./profile-songs";

const SpotifyProfile = () => {
  const { spotifyProfile } = useSelector((state) => state.spotify);
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

      <ProfileArtists />

      <ProfileSongs />
    </>
  );
};

export default SpotifyProfile;
