import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAlbumName, getArtistName, getDuration, getImage, getSongID, getSongLink, getSongName } from "./songs-helpers"
import { findSongBySearchTermThunk } from "./songs-thunks"

const SongsSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const { songs } = useSelector((state) => state.songs)

    

    const dispatch = useDispatch()
    useEffect(() => {
        if (searchTerm !== '') {
            dispatch(findSongBySearchTermThunk(searchTerm))
        }
    }, [])

    return (
        <>
            <h1>Search</h1>

            <div className="row mb-3">

                <input
                    className="form-control w-75"
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }}
                    value={searchTerm}
                    placeholder="Search for a track" />
                <button
                    className="btn btn-primary w-25"
                    onClick={() => {
                        dispatch(findSongBySearchTermThunk(searchTerm))
                    }}>Search
                </button>
            </div>
            <div className="row">

                <div className="col-1">
                    #
                </div>
                <div className="col-7">
                    Title
                </div>
                <div className="col-3">
                    Album
                </div>
                <div className="col-1">
                    Time
                </div>


                <ul className="list-group pe-0">
                    {
                        songs && songs.map((song, idx) =>
                            <li key={song.id} className="list-group-item p-2">
                                <div className="row">
                                    <span className="col-1 my-auto">{idx + 1}</span>
                                    <span className="col-7 my-auto">
                                        <a className="me-3" href={getSongLink(song)} target="_blank" rel="noreferrer"><img src={getImage(song)} height={100} alt="song art" /></a>
                                        <Link to={`/details/${getSongID(song)}`}>
                                            {getSongName(song)} - {getArtistName(song)}
                                        </Link>
                                    </span>
                                    <span className="col-3 my-auto ">{getAlbumName(song)}</span>
                                    <span className="col-1 my-auto ">{getDuration(song)}</span>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>

        </>
    )
}

// songs && songs.map((song) =>
//                         <li key={song.id} className="list-group-item">
//                             <i onClick={() => {
//                                 dispatch(userLikesMovieThunk({
//                                     uid: 111, mid: movie.imdbID
//                                 }))
//                             }} className="float-end bi bi-hand-thumbs-up"></i>
//                             <i className="float-end bi bi-hand-thumbs-down me-2"></i>
//                             <a href={song.external_urls.spotify}><img src={song.album.images[0].url} height={50}/></a>
//                             <Link to={`/details/${movie.imdbID}`}>
//                                 {movie.Title}
//                             </Link>
//                         </li>
//                     )

export default SongsSearch;