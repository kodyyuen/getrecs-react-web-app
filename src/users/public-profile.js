import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAlbumName, getArtistName, getDuration, getImage, getSongID, getSongLink, getSongName } from "../songs/songs-helpers";
import { findMultipleSongsBySongIDThunk } from "../songs/songs-thunks";
import { findUserByIdThunk } from "./users-thunk";

const PublicProfile = () => {
  const { uid } = useParams();
  const { publicProfile } = useSelector((state) => state.users);
  const { multipleDetails } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findUserByIdThunk(uid))
    if (publicProfile) {
      dispatch(findMultipleSongsBySongIDThunk(publicProfile.likes))
    }
  }, [uid, publicProfile]);
  return (
    <>
      <h1>Public Profile</h1>
      <h1>{publicProfile && publicProfile.username}</h1>
      {
        publicProfile && multipleDetails &&
        <ul className="list-group">
          {
            multipleDetails.tracks.map((song, idx) =>
              <li key={idx} className="list-group-item p-2">
                <div className="row">
                  <div className="col-1">
                    <a href={getSongLink(song)} target="_blank" rel="noreferrer"><img src={getImage(song)} height={100} alt="song art" /></a>
                  </div>
                  <div className="col-7 ps-5">
                    <Link to={`/details/${getSongID(song)}`}>
                      {getSongName(song)} - {getArtistName(song)}
                    </Link>
                  </div>
                  <div className="col-3  ">{getAlbumName(song)}</div>
                  <div className="col-1  ">{getDuration(song)}</div>
                </div>
              </li>
            )
          }
        </ul>

      }
    </>
  )
}

// const PublicProfile = () => {
//   const { uid } = useParams();
//   const { publicProfile } = useSelector((state) => state.users);
//   const { multipleDetails } = useSelector((state) => state.songs);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(findUserByIdThunk(uid))
//     if (publicProfile) {
//       dispatch(findMultipleSongsBySongIDThunk(publicProfile.likes))
//     }
//   }, [uid, publicProfile]);
//   return (
//     <>
//       <h1>Public Profile</h1>
//       <h1>{publicProfile && publicProfile.username}</h1>

//       <h1>{publicProfile && publicProfile.likes}</h1>
//       {
//         publicProfile && multipleDetails &&
//         <ul className="list-group">
//           {
//             multipleDetails.tracks.map((song, idx) =>
//               <li key={idx} className="list-group-item p-2">
//                 <div className="row">
//                   <div className="col-1">
//                     <a href={getSongLink(song)} target="_blank" rel="noreferrer"><img src={getImage(song)} height={100} alt="song art" /></a>
//                   </div>
//                   <div className="col-7 ps-5">
//                     <Link to={`/details/${getSongID(song)}`}>
//                       {getSongName(song)} - {getArtistName(song)}
//                     </Link>
//                   </div>
//                   <div className="col-3  ">{getAlbumName(song)}</div>
//                   <div className="col-1  ">{getDuration(song)}</div>
//                 </div>
//               </li>
//             )
//           }
//         </ul>

//       }
//     </>
//   )
// }

export default PublicProfile;