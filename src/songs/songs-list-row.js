import { Link } from "react-router-dom";
import {
  getAlbumName,
  GetArtistsLinks,
  getDuration,
  getImage,
  getSongID,
  getSongLink,
  getSongName,
} from "./songs-helpers";

const SongsListRow = ({ song, idx }) => {
  return (
    <li className="list-group-item p-1">
      <div className="row d-flex align-items-center m-0">
        <div className="col-1">{idx + 1}</div>
        <div className="col-3 col-sm-1 col-md-2">
          <a
            className=""
            href={getSongLink(song)}
            target="_blank"
            rel="noreferrer"
          >
            <img src={getImage(song)} className="img-fluid" alt="song art" />
          </a>
        </div>
        <div className="col col-sm-5 ps-2">
          <Link to={`/details/${getSongID(song)}`}>
            <h6>{getSongName(song)}</h6>
          </Link>
          <GetArtistsLinks {...{song}}/>
        </div>
        <div className="d-none d-sm-block col-sm-3">
          <h6 className="text-muted">{getAlbumName(song)}</h6>
        </div>
        <div className="d-none d-sm-block col-sm-2 col-md-1">
          {getDuration(song)}
        </div>
      </div>
    </li>
  );
};

export default SongsListRow;
