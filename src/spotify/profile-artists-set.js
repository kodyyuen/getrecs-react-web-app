import ArtistCard from "./artist-card";

const ProfileArtistsSet = ({ artists }) => {
  return (
    <div className="row row-cols-2 row-cols-md-5 my-3 px-1 justify-content-around">
      {artists.map((a) => (
        <ArtistCard artist={a} />
      ))}
    </div>
  );
};

export default ProfileArtistsSet;
