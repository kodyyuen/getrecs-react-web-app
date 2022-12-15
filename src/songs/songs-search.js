import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RenderSongsList } from "./songs-list"
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
        <div className="container p-1 me-1">

            <h1>Search</h1>
            <div className="input-group mb-5">
                <input
                    className="form-control"
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }}
                    value={searchTerm}
                    placeholder="Search for a track" />
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        dispatch(findSongBySearchTermThunk(searchTerm))
                    }}>Search
                </button>
            </div>
            {
                songs && <RenderSongsList songs={songs} />
            }
        </div>

    )
}

export default SongsSearch;