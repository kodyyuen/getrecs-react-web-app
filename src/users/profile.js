import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, updateUserThunk } from "./users-thunk";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const handleLogoutBtn = () => {
    dispatch(logoutThunk())
    navigate('/login')
  }
  useEffect(() => {
    dispatch(updateUserThunk(currentUser.name))
  }, [])
  const handleUpdateName = (newName) => {
    dispatch(updateUserThunk({name: newName}))
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
        <button className="btn btn-primary w-25">Save</button>
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