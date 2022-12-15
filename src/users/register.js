import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import { registerThunk } from "./users-thunk"

const Register = () => {
  const { currentUser } = useSelector((state) => state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)
  const dispatch = useDispatch()
  const handleRegisterBtn = () => {
    const role = admin ? "ADMIN" : "USER"
    dispatch(registerThunk({ username, password, role }))
  }
  const handleAdminBtn = () => {
    setAdmin(!admin)
  }

  if (currentUser) {
    return (<Navigate to={'/profile'} />)
  }

  return (
    <>
      {/* Medium - XLarge screen size */}
      <div class="d-flex flex-column align-items-center d-none d-md-block">
        <h1 className="text-center mt-2 mb-4">Register</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-3 w-50 m-auto"
          placeholder="username"
          value={username} />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3 w-50 m-auto"
          placeholder="password"
          type="password"
          value={password} />
        <div className="w-50 m-auto mb-4">
          <label className="mt-2 mb-2">
            <input
              type="checkbox"
              className="me-1"
              checked={admin}
              onChange={() => handleAdminBtn()} />
            Admin
          </label>
        </div>
        <div className="d-flex">
          <button
            className="btn btn-primary w-25 m-auto"
            onClick={handleRegisterBtn}>
            Register
          </button>
        </div>
      </div>

      {/* XSmall - Small screen size */}
      <div class="d-flex flex-column align-items-center d-xs-block d-md-none">
        <h1 className="text-center mt-2 mb-4">Register</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-3"
          placeholder="username"
          value={username} />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3"
          placeholder="password"
          type="password"
          value={password} />
        <div className="mb-4">
          <label className="mt-2 mb-2">
            <input
              type="checkbox"
              className="me-1"
              checked={admin}
              onChange={() => handleAdminBtn()} />
            Admin
          </label>
        </div>
        <button
          className="btn btn-primary w-50"
          onClick={handleRegisterBtn}>
          Register
        </button>
      </div>
      {
        currentUser &&
        <h1>Welcome new user: {currentUser.username}</h1>
      }
    </>
  )
}

export default Register;