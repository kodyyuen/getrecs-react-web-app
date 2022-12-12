import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, updateUserThunk } from "./users-thunk";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { findMultipleSongsBySongIDThunk } from "../songs/songs-thunks";
import { RenderSongsList } from "../songs/songs-list";

const Profile = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.users)
  const { multipleDetails } = useSelector((state) => state.songs)
  const dispatch = useDispatch()
  const handleLogoutBtn = () => {
    dispatch(logoutThunk())
    navigate('/login')
  }
  useEffect(() => {
    dispatch(findMultipleSongsBySongIDThunk(currentUser.likes))
  }, [])
  const handleUpdateName = (newName) => {
    dispatch(updateUserThunk({ name: newName }))
  }
  return (
    <>
      <h1>Private Profile</h1>
      {
        currentUser &&
        <h2>Welcome new user: {currentUser.username}</h2>
      }
      <div className="row">
        <label for="name">Name (Optional)</label>
        <input id="name"
          onChange={(e) => handleUpdateName(e.target.value)}
          className="form-control w-50"
          placeholder="Your name"
          value={currentUser.name} />
      </div>
      <div className="row">
        <ul className="list-group pe-0">
          {
            multipleDetails && <RenderSongsList songs={multipleDetails}/>
          }
        </ul>
      </div>

      <button
        className="btn btn-danger"
        onClick={handleLogoutBtn}>
        Logout
      </button>
    </>
  )
}
export default Profile