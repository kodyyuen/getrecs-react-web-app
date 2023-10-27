const Card = ({ item, type }) => {
  const imgStyle = {
    aspectRatio: 1,
  };

  return (
    <>
      <div className="col my-2 p-1">
        <div className="card bg-dark text-light text-center">
          <a
            className="p-0"
            href={item.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "#FFF" }}
          >
            <div className="row align-items-center m-0">
              <div
                className={`col-4 col-md-12  ${
                  type === "playlist" ? "p-3" : "p-2"
                }`}
              >
                <img
                  className={`img-fluid ${
                    type === "playlist" ? "rounded-3" : "rounded-circle p-md-4"
                  }`}
                  style={imgStyle}
                  src={item.images[0].url}
                  alt="pic"
                />
              </div>
              <div className="col-8 col-md-12 p-1">
                <div className="card-body p-0">
                  <h5 className="card-title">{item.name}</h5>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
