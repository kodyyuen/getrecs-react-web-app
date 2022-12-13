import { Link } from "react-router-dom";
import { getAlbumName, getArtistName, getDuration, getImage, getSongID, getSongLink, getSongName } from "../songs/songs-helpers";

export const RenderSongsList = ({ songs }) => {
    return (
        <div className="row">
            <div className="col-1">
                <h5 className="font-weight-bold mb-1">#</h5>
            </div>
            <div className="col-7">
                <h5 className="font-weight-bold mb-1">Title</h5>
            </div>
            <div className="col-3">
                <h5 className="font-weight-bold mb-1">Album</h5>
            </div>
            <div className="col-1">
                <h5 className="font-weight-bold mb-1">Time</h5>
            </div>
            <ul className="list-group pe-0">
                {
                    songs.map((song, idx) =>
                        <li key={song.id} className="list-group-item p-2">
                            <div className="row d-flex align-items-center">
                                <div className="col-1 ps-3">{idx + 1}</div>
                                <div className="col-2">
                                    <a className="" href={getSongLink(song)} target="_blank" rel="noreferrer"><img src={getImage(song)} className="img-fluid" alt="song art" /></a>
                                </div>
                                <div className="col-5">
                                    <Link to={`/details/${getSongID(song)}`}>
                                        <h5>
                                            {getSongName(song)} - {getArtistName(song)}
                                        </h5>
                                    </Link>
                                </div>
                                <div className="col-3">
                                    <h5 className="text-muted">
                                        {getAlbumName(song)}
                                    </h5>
                                </div>
                                <div className="col-1">{getDuration(song)}</div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}