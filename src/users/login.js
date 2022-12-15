import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { loginThunk } from "./users-thunk";

const Login = () => {
  const { currentUser } = useSelector((state) => state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleLoginBtn = () => {
    try {
      dispatch(loginThunk({ username, password }))
      // navigate('/profile')
    } catch (e) {

    }
  }
  if (currentUser) {
    return (<Navigate to={'/profile'} />)
  }
  return (
    <>
      {/* Medium - XLarge screen size */}
      <div class="d-flex flex-column align-items-center d-none d-md-block">
        <h1 className="text-center mt-2 mb-4">Login</h1>
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
        <div className="d-flex">
          <button
            className="btn btn-primary w-25 m-auto"
            onClick={handleLoginBtn}>Login</button>
        </div>
      </div>

      {/* XSmall - Small screen size */}
      <div class="d-flex flex-column align-items-center d-xs-block d-md-none">
        <h1 className="text-center mt-2 mb-4">Login</h1>
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
        <button
          className="btn btn-primary w-50"
          onClick={handleLoginBtn}>Login</button>
      </div>
    </>
  )
}

export default Login;