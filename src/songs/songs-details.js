import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { findSongBySongIDThunk } from "./songs-thunks";
import { getAlbumName, getArtistName, getDuration, getImage, getSongID, getSongLink, getSongName, getArtistLink } from "./songs-helpers"

const Details = () => {
    const { songID } = useParams();
    const { details } = useSelector((state) => state.songs)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findSongBySongIDThunk(songID))
    }, [])
    return (
        <>
            <h1>Details</h1>
            <div className="row">
                <div className="col">
                    {
                        details &&
                        <ul className="list-group">
                            <li className="list-group-item">
                                <a href={getSongLink(details)}>Song: {getSongName(details)}</a>
                            </li>
                            <li className="list-group-item">
                                <a href={getArtistLink(details)}>Artist: {getArtistName(details)}</a>
                            </li>
                            <li className="list-group-item">
                                <img src={getImage(details)} />
                            </li>
                        </ul>
                    }

                </div>

            </div>

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