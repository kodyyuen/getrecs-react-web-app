const ArtistCard = ({ artist }) => {
  return (
    <>
      <div className="col">
        <div className="card bg-dark text-light">
          <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
            <img
              className="img-fluid rounded-circle p-4"
              src={artist.images[0].url}
              alt="artist profile pic"
            />
          </a>
          <div className="card-body text-center">
            <h3 className="card-title">{artist.name}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
