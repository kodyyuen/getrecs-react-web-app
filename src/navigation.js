import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import LogOutButton from "./users/logout-button";
import UserDropdown from "./navigation/nav-user-dropdown";
import { spotifyLogoutThunk } from "./spotify/spotify-thunks";
import { logoutThunk } from "./users/users-thunk";

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
              {!(currentUser || spotifyProfile) && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className={`nav-link ${
                        parts[1] === "login" ? "active text-primary" : ""
                      }`}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/register"
                      className={`nav-link ${
                        parts[1] === "register" ? "active text-primary" : ""
                      }`}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              {currentUser && (
                <>
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
                </>
              )}
            </ul>
            {currentUser && (
              <UserDropdown
                name={
                  currentUser.name.length > 0
                    ? currentUser.name
                    : currentUser.username
                }
                {...{parts}}
                thunk={logoutThunk}
              />
            )}
            {spotifyProfile && (
              <UserDropdown
                name={spotifyProfile.display_name}
                {...{parts}}
                thunk={spotifyLogoutThunk}
              />
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
              className="btn"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-bars"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
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
              {!(currentUser || spotifyProfile) && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className={`dropdown-item ${
                        parts[1] === "login" ? "active" : ""
                      }`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className={`dropdown-item ${
                        parts[1] === "register" ? "active" : ""
                      }`}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              {currentUser && (
                <>
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
                      Profile
                    </Link>
                  </li>
                  <li
                    className={`${
                      currentUser.role !== "ADMIN" ? "d-none" : ""
                    }`}
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
                </>
              )}
              {(currentUser || spotifyProfile) && (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className={`dropdown-item ${
                        parts.length === 2 &&
                        (parts[1] === "profile" || parts[1] === "spotify")
                          ? "active"
                          : ""
                      }`}
                    >
                      Private Profile
                    </Link>
                  </li>
                  <li className="dropdown-divider" />
                  <li>
                    <LogOutButton
                      thunk={currentUser ? logoutThunk : spotifyLogoutThunk}
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
