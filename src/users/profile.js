import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, updateUserThunk } from "./users-thunk";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { findMultipleSongsBySongIDThunk } from "../songs/songs-thunks";
import { RenderSongsList } from "../songs/songs-list";

const Profile = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const handleLogoutBtn = () => {
    dispatch(logoutThunk())
    navigate('/login')
  }

  const handleUpdateName = (newName) => {
    dispatch(updateUserThunk({ name: newName }))
  }

  return (
    <>
      <h3>Private Profile</h3>
      {
        <>
        <h1>{currentUser.username}</h1>
        <h4>{`${currentUser.likes.length} ${currentUser.likes.length === 1 ? "like" : "likes"}`} | {currentUser.recommendations.length / 20} recs</h4>
        </>
      }
      <button
        className="btn btn-danger"
        onClick={handleLogoutBtn}>
        Logout
      </button>
      <div className="row">
        <label for="name">Name (Optional)</label>
        <input id="name"
          onChange={(e) => handleUpdateName(e.target.value)}
          className="form-control w-50"
          placeholder="Your name"
          value={currentUser.name} />
      </div>
      {
        currentUser && <RenderSongsList songs={currentUser.likesData} />
      }
    </>
  )
}
export default Profile