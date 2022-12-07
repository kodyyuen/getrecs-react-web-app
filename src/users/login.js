import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { loginUrl } from "../spotify";
import { loginThunk } from "./users-thunk";

const Login = () => {
    const {currentUser} = useSelector((state) => state.users)
    const [username, setUsername] = useState('alice')
    const [password, setPassword] = useState('alice1234')
    const dispatch = useDispatch()
    const handleLoginBtn = () => {
        try {
            dispatch(loginThunk({username, password}))
            // navigate('/profile')
        } catch (e) {

        }
    }
    if (currentUser) {
        return (<Navigate to={'/profile'}/>)
    }
    return (
        <>
            <h1>Login</h1>
            <a href={loginUrl} id="signInButton">Sign in</a>
            <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="username"
                value={username}/>
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control" placeholder="password" type="password" value={password}/>
            <button
                className="btn btn-primary w-100"
                onClick={handleLoginBtn}>Login</button>
        </>
    )
}

export default Login;