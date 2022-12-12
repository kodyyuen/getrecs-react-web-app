import { Link } from "react-router-dom";
import { getAlbumName, getArtistName, getDuration, getImage, getSongID, getSongLink, getSongName } from "../songs/songs-helpers";

export const RenderSongsList = ({songs}) => {
    return (
        <>
            {
                songs.map((song, idx) =>
                    <li key={idx} className="list-group-item p-2">
                        <div className="row">
                            <div className="col-1 my-auto">
                                <a href={getSongLink(song)} target="_blank" rel="noreferrer"><img src={getImage(song)} height={100} alt="song art" /></a>
                            </div>
                            <div className="col-7 ps-5 my-auto">
                                <Link to={`/details/${getSongID(song)}`}>
                                    {getSongName(song)} - {getArtistName(song)}
                                </Link>
                            </div>
                            <div className="col-3 my-auto">{getAlbumName(song)}</div>
                            <div className="col-1 my-auto">{getDuration(song)}</div>
                        </div>
                    </li>
                )
            }
        </>
    )
}