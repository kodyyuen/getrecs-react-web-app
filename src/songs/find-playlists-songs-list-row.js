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
import { findPlaylistsWithSongThunk } from "../spotify/spotify-thunks";
import { useDispatch, useSelector } from "react-redux";

const FindPlaylistsSongsListRow = ({
  song,
  idx,
  findSong,
  setFindSong,
  selected,
  setSelected,
}) => {
  const { apiKey, playlistsLoading, currentFindSong, foundPlaylists } = useSelector((state) => state.spotify);
  const dispatch = useDispatch();
  // const [selected, setSelected] = useState("");
  const onOptionChange = (e) => {
    setFindSong(e.target.id);
  };
  return (
    <li className="list-group-item p-1">
      <div className="row d-flex align-items-center m-0">
        <div className="col-1">{idx + 1}</div>
        <div className="col-3 col-md-2">
          <a
            className=""
            href={getSongLink(song)}
            target="_blank"
            rel="noreferrer"
          >
            <img src={getImage(song)} className="img-fluid" alt="song art" />
          </a>
        </div>
        <div className="col col-sm-6 col-md-4 col-lg-4 ps-2">
          <Link to={`/details/${getSongID(song)}`}>
            <h6>{getSongName(song)}</h6>
          </Link>
          <GetArtistsLinks {...{ song }} />
        </div>
        <div className="d-none d-md-block col-md-2">
          <h6 className="text-muted">{getAlbumName(song)}</h6>
        </div>
        <div className="d-none d-md-block col-md-1">{getDuration(song)}</div>
        <div className="col col-xs-2 col-sm-1 col-md-2 d-flex justify-content-center">
          {findSong !== getSongID(song) && (
            <>
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                // id={`btnradio-${idx}`}
                // checked={selected === `btnradio-${idx}`}
                id={getSongID(song)}
                checked={findSong === getSongID(song)}
                // onClick={() => {
                //   // setSelected(e.target.id);
                //   // console.log(e.target.id)
                //   setFindSong(getSongID(song));
                // }}
                onChange={onOptionChange}
              />
              <label class="btn btn-outline-primary" htmlFor={getSongID(song)}>
                Select
              </label>
            </>
          )}
          {/* {playlistsLoading && findSong === getSongID(song) && (
            <i className="btn btn-primary fa-brands fa-spotify fa-bounce" />
          )} */}
          {findSong === getSongID(song) && (
            <button
              className="btn btn-primary"
              onClick={() => {
                if (findSong !== currentFindSong) {
                  dispatch(findPlaylistsWithSongThunk({ findSong, apiKey }));
                }
                // setFindSong("");
              }}
            >
              {/* {playlistsLoading ? (
                <i className="fa-brands fa-spotify fa-bounce" />
              ) : (
                <>
                  <i className="fa-solid fa-circle-plus me-2"></i>Find Playlists
                </>
              )} */}
              <Link to={`/playlists/${getSongID(song)}`}>
                <i className="fa-solid fa-circle-plus me-2"></i>Find Playlists
              </Link>
            </button>
          )}
          {/* <button className="btn btn-primary"
            onClick={() => setFindSong(getSongID(song))}>Select</button> */}
        </div>
      </div>
    </li>
  );
};

export default FindPlaylistsSongsListRow;
