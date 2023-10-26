import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { findSongBySongIDThunk } from "../songs/songs-thunks";
import {
  getArtistName,
  getDuration,
  getImage,
  getSongLink,
  getSongName,
  getArtistLink,
} from "../songs/songs-helpers";
import CardSet from "./card-set";

const Playlists = () => {
  const { songID } = useParams();
  const { foundPlaylists, playlistsLoading, currentFindSong } = useSelector(
    (state) => state.spotify
  );
  const { details } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findSongBySongIDThunk(songID));
  }, []);

  return (
    <>
      <h1>Details</h1>
      {details && (
        <>
          <div className="row">
            <div className="col-5">
              <img
                src={getImage(details)}
                className="img-fluid"
                alt="song art"
              />
            </div>
            <div className="col-7 text-dark">
              <h1>
                <a href={getSongLink(details)} target="_blank" rel="noreferrer">
                  {getSongName(details)}
                </a>
              </h1>
              <h3>
                <a
                  href={getArtistLink(details)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getArtistName(details)}
                </a>
              </h3>
              <h4>{getDuration(details)}</h4>
            </div>
          </div>
        </>
      )}
      {playlistsLoading && (
        <>
          <i className="fa-brands fa-spotify fa-bounce"></i>
          {` Finding Playlists...`}
        </>
      )}
      {songID === currentFindSong &&
        (foundPlaylists.length > 0 ? (
          <CardSet set={foundPlaylists} type={"playlist"} />
        ) : (
          <p>No playlists found</p>
        ))}
    </>
  );
};

export default Playlists;
