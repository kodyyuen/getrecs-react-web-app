import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const Navigation = () => {
  const { currentUser } = useSelector((state) => state.users)
  const { pathname } = useLocation()
  const parts = pathname.split('/')
  return (
    <>
      <nav className="navbar navbar-expand d-none d-md-block navbar-light bg-light mb-2">
        <div className="container-fluid">
          <a className="navbar-brand">GetRecs</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/"
                  className={`nav-link ${parts[1] === '' ? 'active text-primary' : ''}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/search"
                  className={`nav-link ${parts[1] === 'search' ? 'active text-primary' : ''}`}>
                  Search
                </Link>
              </li>
              <li className={`nav-item ${currentUser ? 'd-none' : ''}`}>
                <Link to="/login"
                  className={`nav-link ${parts[1] === 'login' ? 'active text-primary' : ''}`}>
                  Login
                </Link>
              </li>
              <li className={`nav-item ${currentUser ? 'd-none' : ''}`}>
                <Link to="/register"
                  className={`nav-link ${parts[1] === 'register' ? 'active text-primary' : ''}`}>
                  Register
                </Link>
              </li>
              {
                currentUser &&
                <li className="nav-item">
                  <Link to={`/profile/${currentUser._id}`}
                    className={`nav-link ${parts[1] === 'profile'
                      && parts.length == 3
                      && parts[2] === currentUser._id ? 'active text-primary' : ''}`}>
                    Profile
                  </Link>
                </li>
              }
              {
                currentUser &&
                <li className={`nav-item ${currentUser.role !== "ADMIN" ? 'd-none' : ''}`}>
                  <Link to="/users"
                    className={`nav-link ${parts[1] === 'users' ? 'active text-primary' : ''}`}>
                    Users
                  </Link>
                </li>
              }

            </ul>
            {
              currentUser &&
              <li className="d-flex">
                <Link to="/profile" className="text-dark">
                  Welcome, {currentUser.username}
                </Link>
              </li>
            }
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand d-xs-block d-md-none navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">GetRecs</a>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Menu
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link to="/"
                  className={`dropdown-item ${parts[1] === '' ? 'active' : ''}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search"
                  className={`dropdown-item ${parts[1] === 'search' ? 'active' : ''}`}>
                  Search
                </Link>
              </li>
              <li className={`${currentUser ? 'd-none' : ''}`}>
                <Link to="/login"
                  className={`dropdown-item ${parts[1] === 'login' ? 'active' : ''}`}>
                  Login
                </Link>
              </li>
              <li className={`${currentUser ? 'd-none' : ''}`}>
                <Link to="/register"
                  className={`dropdown-item ${parts[1] === 'register' ? 'active' : ''}`}>
                  Register
                </Link>
              </li>
              {
                currentUser &&
                <li>
                  <Link to={`/profile/${currentUser._id}`}
                    className={`dropdown-item ${parts[1] === 'profile'
                      && parts.length == 3
                      && parts[2] === currentUser._id ? 'active' : ''}`}>
                    Profile
                  </Link>
                </li>
              }
              {
                currentUser &&
                <li className={`${currentUser.role !== "ADMIN" ? 'd-none' : ''}`}>
                  <Link to="/users"
                    className={`dropdown-item ${parts[1] === 'users' ? 'active' : ''}`}>
                    Users
                  </Link>
                </li>
              }
              {
                currentUser &&
                <li>
                  <Link to="/profile" className="dropdown-item text-dark">
                    Welcome, {currentUser.username}
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation