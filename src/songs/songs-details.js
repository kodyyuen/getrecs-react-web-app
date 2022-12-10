import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { findSongBySongIDThunk } from "./songs-thunks";
import { toggleSongLikeThunk } from "../users/users-thunk";
import { getAlbumName, getArtistName, getDuration, getImage, getSongID, getSongLink, getSongName, getArtistLink } from "./songs-helpers"

const Details = () => {
    const { songID } = useParams();
    const { details } = useSelector((state) => state.songs);
    const { currentUser } = useSelector((state) => state.users);
    const [liked, setLiked] = useState(currentUser && currentUser.likes.includes(songID));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findSongBySongIDThunk(songID))
    }, [])

    useEffect(() => {
        setLiked(currentUser && currentUser.likes.includes(songID));
    }, [currentUser])

    const handleLikeButton = () => {
        let newlikedSongs = [songID];
        if (liked) {
            newlikedSongs = [...currentUser.likes.filter(song => song !== songID)];
        } else {
            newlikedSongs = [songID, ...currentUser.likes];
        }

        dispatch(toggleSongLikeThunk({ songIds: newlikedSongs }));
    }

    return (
        <>
            <h1>Details</h1>
            {
                details &&
                <>
                    <div className="row">
                        <div className="col-5">
                            <img src={getImage(details)} className="img-fluid" alt="song art" />
                        </div>
                        <div className="col-7 text-dark">
                            <h1>
                                <a href={getSongLink(details)} target="_blank" rel="noreferrer">{getSongName(details)}</a>
                            </h1>
                            <h3>
                                <a href={getArtistLink(details)} target="_blank" rel="noreferrer">{getArtistName(details)}</a>
                            </h3>
                            <h4>
                                {getDuration(details)}
                            </h4>
                            {
                                currentUser &&
                                <i className={`fa-3x fa-heart me-2 ${liked ? "fa text-success" : "fa-regular text-muted"}`}
                                    onClick={handleLikeButton}></i>
                            }
                        </div>
                    </div>

                    <div className="row mt-5">
                        <h1>Likes</h1>
                        <div className="col">
                            <ul className="list-group">
                                <li className="list-group-item">

                                </li>
                                <li className="list-group-item">

                                </li>
                                <li className="list-group-item">

                                </li>
                            </ul>


                        </div>
                    </div>
                </>

            }
        </>
    )
}

// //<h1>Details</h1>
// <div className="row">
//     <div className="col">
//         {
//             details &&
//             <ul className="list-group">
//             <li className="list-group-item">
//                 <a href={getSongLink(details)}>Song: {details.name}</a>
//             </li>
//             <li className="list-group-item">
//                 <a href={getArtistLink(details)}>Artist: {getArtistName(details)}</a>
//             </li>
//         </ul>
//         }

//     </div>
//     <div className="col">
//         <img src={getImage(details)} />
//     </div>
// </div>

// {
//     currentUser &&
//     <div>
//         <textarea
//             onChange={(e) => setReview(e.target.value)}
//             className="form-control"></textarea>
//         <button onClick={handlePostReviewBtn}>Post Review</button>
//     </div>
// }
// <ul className="list-group">
//     {
//         reviews.map((review) =>
//             <li className="list-group-item">
//                 {review.review}
//                 <Link to={`/profile/${review.author._id}`} className="float-end">
//                     {review.author.username}
//                 </Link>
//             </li>
//         )
//     }
// </ul>
export default Details;