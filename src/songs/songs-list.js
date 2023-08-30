import { Link } from "react-router-dom";
import {
  getAlbumName,
  getArtistName,
  getArtistsLinks,
  getDuration,
  getImage,
  getSongID,
  getSongLink,
  getSongName,
} from "../songs/songs-helpers";

// export const RenderSongsList = ({ songs }) => {
//   return (
//     <>
//       <div className="row justify-content-between">
//         <div className="row w-50">
//           <div className="col-1">
//             <h5 className="font-weight-bold mb-1">#</h5>
//           </div>
//           <div className="col-6">
//             <h5 className="font-weight-bold mb-1">Title</h5>
//           </div>
//           <div className="col-4">
//             <h5 className="font-weight-bold mb-1">Album</h5>
//           </div>
//           <div className="col-1">
//             <h5 className="font-weight-bold mb-1">Time</h5>
//           </div>
//         </div>
//         <div className="row w-50">
//           <div className="col-1">
//             <h5 className="font-weight-bold mb-1">#</h5>
//           </div>
//           <div className="col-6">
//             <h5 className="font-weight-bold mb-1">Title</h5>
//           </div>
//           <div className="col-4">
//             <h5 className="font-weight-bold mb-1">Album</h5>
//           </div>
//           <div className="col-1">
//             <h5 className="font-weight-bold mb-1">Time</h5>
//           </div>
//         </div>
//       </div>
//       <div className="row w-50">
//         <ul className="list-group pe-0">
//           {songs.map((song, idx) => (
//             <li key={song.id} className="list-group-item p-2">
//               <div className="row d-flex align-items-center">
//                 <div className="col-1 ps-3">{idx + 1}</div>
//                 <div className="col col-sm-2 pe-5">
//                   <a
//                     className=""
//                     href={getSongLink(song)}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     <img
//                       src={getImage(song)}
//                       className="img-fluid"
//                       alt="song art"
//                     />
//                   </a>
//                 </div>
//                 <div className="col col-sm-4 col-md-5">
//                   <Link to={`/details/${getSongID(song)}`}>
//                     <h5>{getSongName(song)}</h5>
//                   </Link>
//                   {/* {getArtistName(song)} */}
//                   {getArtistsLinks(song)}
//                 </div>
//                 <div className="d-none d-sm-block col-sm-3">
//                   <h5 className="text-muted">{getAlbumName(song)}</h5>
//                 </div>
//                 <div className="d-none d-sm-block col-sm-2 col-md-1">
//                   {getDuration(song)}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

export const RenderSongsList = ({ songs }) => {
  return (
    <>
      <div className="row m-0">
        <div className="col-1">
          <h5 className="font-weight-bold mb-1">#</h5>
        </div>
        <div className="col col-6-sm col-md-7">
          <h5 className="font-weight-bold mb-1">Title</h5>
        </div>
        <div className="d-none d-sm-block col-3">
          <h5 className="font-weight-bold mb-1">Album</h5>
        </div>
        <div className="d-none d-sm-block col-sm-2 col-md-1 p-0">
          <h5 className="font-weight-bold mb-1">Time</h5>
        </div>
      </div>
      <div>
        <ul className="list-group pe-0">
          {songs.map((song, idx) => (
            <li key={song.id} className="list-group-item p-1">
              <div className="row d-flex align-items-center m-0">
                <div className="col-1">{idx + 1}</div>
                <div className="col-3 col-sm-1 col-md-2">
                  <a
                    className=""
                    href={getSongLink(song)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={getImage(song)}
                      className="img-fluid"
                      alt="song art"
                    />
                  </a>
                </div>
                <div className="col col-sm-5 ps-2">
                  <Link to={`/details/${getSongID(song)}`}>
                    <h6>
                      {getSongName(song)}
                    </h6>
                  </Link>
                  {/* {getArtistName(song)} */}
                  {getArtistsLinks(song)}
                </div>
                <div className="d-none d-sm-block col-sm-3">
                  <h6 className="text-muted">{getAlbumName(song)}</h6>
                </div>
                <div className="d-none d-sm-block col-sm-2 col-md-1">
                  {getDuration(song)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
