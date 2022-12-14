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
        dispatch(registerThunk({ username, password, role}))
    }
    const handleAdminBtn = () => {
        setAdmin(!admin)
    }

    if (currentUser) {
        return (<Navigate to={'/profile'} />)
    }

    return (
        <>
            <h1>Register</h1>
            <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="username"
                value={username} />
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="password"
                type="password"
                value={password} />
            <label className="mt-2 mb-2">
                <input
                    type="checkbox"
                    className="me-1"
                    checked={admin}
                    onChange={() => handleAdminBtn()} />
            Admin
            </label>
            <button
                className="btn btn-primary w-100"
                onClick={handleRegisterBtn}>
                Register
            </button>
            {
                currentUser &&
                <h1>Welcome new user: {currentUser.username}</h1>
            }
        </>
    )
}

export default Register;