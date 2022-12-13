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
        <>
            <h1>Search</h1>
            <div className="row mb-5">
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
            {
                songs && <RenderSongsList songs={songs} />
            }
        </>
    )
}

export default SongsSearch;