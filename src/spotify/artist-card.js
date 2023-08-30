const ArtistCard = ({ artist }) => {
  const imgStyle = {
    aspectRatio: 1,
  };

  return (
    <>
      <div className="col my-2 p-1">
        <div className="card bg-dark text-light text-center">
          <div className="row align-items-center m-0">
            <div className="col-4 col-md-12 p-1">
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="img-fluid rounded-circle p-md-4"
                  style={imgStyle}
                  src={artist.images[0].url}
                  alt="artist profile pic"
                />
              </a>
            </div>
            <div className="col-8 col-md-12 p-1">
              <div className="card-body p-0">
                <h5 className="card-title">{artist.name}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
