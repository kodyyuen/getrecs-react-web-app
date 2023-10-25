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
  const { foundPlaylists, playlistsLoading } = useSelector(
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
        <i className="btn btn-primary fa-brands fa-spotify fa-bounce">
          Loading...
        </i>
      )}
      <CardSet set={foundPlaylists} type={"playlist"}/>
      <ul className="list-group pe-0">
        {foundPlaylists.length > 0 ? (
          foundPlaylists.map((p) => {
            return (
              <li className="list-group-item">
                <div className="row d-flex align-items-center">
                  <div className="col-2">
                    <img
                      src={p.images[0].url}
                      className="img-fluid"
                      alt="playlist art"
                    />
                  </div>
                  <div className="col-10">
                    <a
                      href={p.external_urls.spotify}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {p.name}
                    </a>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <div>No playlist found</div>
        )}
      </ul>
    </>
  );
};

export default Playlists;
