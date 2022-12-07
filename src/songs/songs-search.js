import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { findSongBySearchTermThunk } from "./songs-thunks"


const SongsSearch = () => {
    const [searchTerm, setSearchTerm] = useState('Avatar')
    const {songs} = useSelector((state) => state.songs)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findSongBySearchTermThunk(searchTerm))
    }, [])

    return (
        <>
            <h1>Search</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <button
                        className="btn btn-primary float-end"
                        onClick={() => {
                            dispatch(findSongBySearchTermThunk(searchTerm))
                        }}>Search
                    </button>
                    <input
                        className="form-control w-75"
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}
                        value={searchTerm}/>
                </li>
                {
                    songs && songs.map((song) =>
                        <li key={song.id} className="list-group-item">
                            <i className="float-end bi bi-hand-thumbs-up"></i>
                            <i className="float-end bi bi-hand-thumbs-down me-2"></i>
                            <a href={song.external_urls.spotify} target="_blank"><img src={song.album.images[0].url} height={50}/></a>
                            <span>{song.name} - {song.artists[0].name}</span>
                        </li>
                    )
                }
            </ul>
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