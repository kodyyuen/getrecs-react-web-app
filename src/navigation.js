import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const Navigation = () => {
	const { currentUser } = useSelector((state) => state.users)
	const { pathname } = useLocation()
	const parts = pathname.split('/')
	return (
		<ul className="nav nav-pills d-flex flex-row justify-content-between mb-3">
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
		{
			currentUser &&
			<li className={`nav-item ${!currentUser ? 'd-none' : ''}`}>
			<Link to={`/profile/${currentUser._id}`}
				className={`nav-link ${parts[1] === 'profile' && parts.length == 3 ? 'active' : ''}`}>
				Profile
			</Link>
			</li>
		}
      </div>
	  {
		currentUser &&
		<li className={`nav-item ${!currentUser ? 'd-none' : ''}`}>
			{/* TODO: remove this/replace with something else */}
			<Link to="/profile">
				{currentUser ? `Welcome, ${currentUser.username}` : ''}
			</Link>
		</li>
	  }
		</ul>
	)
}

export default Navigation