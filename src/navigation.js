import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import LogOutButton from "./users/logout-button";

const Navigation = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { spotifyProfile } = useSelector((state) => state.spotify);
  const { pathname } = useLocation();
  const parts = pathname.split("/");

  return (
    <>
      <nav className="navbar navbar-expand d-none d-md-block navbar-light bg-light mb-2">
        <div className="container-fluid">
          <Link
            to="/"
            className={`navbar-brand nav-link ${
              parts[1] === "" ? "active text-primary" : ""
            }`}
          >
            GetRecs
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/search"
                  className={`nav-link ${
                    parts[1] === "search" ? "active text-primary" : ""
                  }`}
                >
                  Search
                </Link>
              </li>
              <li className={`nav-item ${currentUser || Object.keys(spotifyProfile).length > 0 ? "d-none" : ""}`}>
                <Link
                  to="/login"
                  className={`nav-link ${
                    parts[1] === "login" ? "active text-primary" : ""
                  }`}
                >
                  Login
                </Link>
              </li>
              <li className={`nav-item ${currentUser || Object.keys(spotifyProfile).length > 0 ? "d-none" : ""}`}>
                <Link
                  to="/register"
                  className={`nav-link ${
                    parts[1] === "register" ? "active text-primary" : ""
                  }`}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/spotify"
                  className={`navbar-brand nav-link ${
                    parts[1] === "spotify" ? "active text-primary" : ""
                  }`}
                >
                  {spotifyProfile.display_name}
                </Link>
              </li>
              {currentUser && (
                <li className="nav-item">
                  <Link
                    to={`/profile/${currentUser._id}`}
                    className={`nav-link ${
                      parts[1] === "profile" &&
                      parts.length === 3 &&
                      parts[2] === currentUser._id
                        ? "active text-primary"
                        : ""
                    }`}
                  >
                    Profile
                  </Link>
                </li>
              )}
              {currentUser && (
                <li
                  className={`nav-item ${
                    currentUser.role !== "ADMIN" ? "d-none" : ""
                  }`}
                >
                  <Link
                    to="/users"
                    className={`nav-link ${
                      parts[1] === "users" ? "active text-primary" : ""
                    }`}
                  >
                    Users
                  </Link>
                </li>
              )}
            </ul>
            {currentUser && (
              <li className="d-flex">
                {/* Logged in as */}
                <div className="dropdown">
                  <div
                    className="btn btn-primary"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {currentUser.name.length > 0
                      ? currentUser.name
                      : currentUser.username}
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link to="/profile" className="dropdown-item text-dark">
                        Private Profile
                      </Link>
                    </li>
                    <li className="dropdown-divider" />
                    <li>
                      <LogOutButton />
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </div>
        </div>
      </nav>
      
      <nav className="navbar navbar-expand d-xs-block d-md-none navbar-light bg-light">
        <div className="container-fluid">
          <Link
            to="/"
            className={`navbar-brand nav-link ${
              parts[1] === "" ? "active text-primary" : ""
            }`}
          >
            GetRecs
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menu
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link
                  to="/search"
                  className={`dropdown-item ${
                    parts[1] === "search" ? "active" : ""
                  }`}
                >
                  Search
                </Link>
              </li>
              <li className={`${currentUser ? "d-none" : ""}`}>
                <Link
                  to="/login"
                  className={`dropdown-item ${
                    parts[1] === "login" ? "active" : ""
                  }`}
                >
                  Login
                </Link>
              </li>
              <li className={`${currentUser ? "d-none" : ""}`}>
                <Link
                  to="/register"
                  className={`dropdown-item ${
                    parts[1] === "register" ? "active" : ""
                  }`}
                >
                  Register
                </Link>
              </li>
              {currentUser && (
                <li>
                  <Link
                    to={`/profile/${currentUser._id}`}
                    className={`dropdown-item ${
                      parts[1] === "profile" &&
                      parts.length === 3 &&
                      parts[2] === currentUser._id
                        ? "active"
                        : ""
                    }`}
                  >
                    Public Profile
                  </Link>
                </li>
              )}
              {currentUser && (
                <li
                  className={`${currentUser.role !== "ADMIN" ? "d-none" : ""}`}
                >
                  <Link
                    to="/users"
                    className={`dropdown-item ${
                      parts[1] === "users" ? "active" : ""
                    }`}
                  >
                    Users
                  </Link>
                </li>
              )}
              {currentUser && (
                <li>
                  <Link to="/profile" className="dropdown-item text-dark">
                    Private Profile
                  </Link>
                </li>
              )}
              <li className={` ${currentUser ? "dropdown-divider" : ""}`} />
              {currentUser && (
                <li>
                  <LogOutButton />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
