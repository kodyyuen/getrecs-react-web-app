import ArtistCard from "./artist-card";
import SelectTracksTime from "./select-tracks-time";

const ProfileArtistsSet = ({artists}) => {
  return (
    
    <div className="row row-cols-5 my-3">
      {artists.map((a) => (
        <ArtistCard artist={a} />
      ))}
    </div>
  );
};

export default ProfileArtistsSet;