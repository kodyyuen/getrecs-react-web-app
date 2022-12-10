import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const Navigation = () => {
	const { currentUser } = useSelector((state) => state.users)
	const { pathname } = useLocation()
	const parts = pathname.split('/')
	return (
		<ul className="nav nav-pills d-flex flex-row justify-content-between">
      <div className="d-flex flex-row">
        <li className="nav-item">
          <Link to="/"
            className={`nav-link ${parts[1] === '' ? 'active' : ''}`}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/search"
            className={`nav-link ${parts[1] === 'search' ? 'active' : ''}`}>
            Search
          </Link>
        </li>
        <li className={`nav-item ${currentUser ? 'd-none' : ''}`}>
          <Link to="/login"
            className={`nav-link ${parts[1] === 'login' ? 'active' : ''}`}>
            Login
          </Link>
        </li>
        <li className={`nav-item ${currentUser ? 'd-none' : ''}`}>
          <Link to="/register"
            className={`nav-link ${parts[1] === 'register' ? 'active' : ''}`}>
            Register
          </Link>
        </li>
        <li className={`nav-item ${!currentUser ? 'd-none' : ''}`}>
          <Link to="/profile"
            className={`nav-link ${parts[1] === 'profile' ? 'active' : ''}`}>
            Profile
          </Link>
        </li>
      </div>
      <li className="nav-item">
        {/* TODO: remove this/replace with something else */}
        {currentUser ? `Welcome, ${currentUser.username}` : ''}
      </li>
		</ul>
	)
}

export default Navigation