import { Link } from "react-router-dom";
import LogOutButton from "../users/logout-button";

const UserDropdown = ({name, thunk}) => {
  return (
    <li className="d-flex">
      <div className="dropdown">
        <div
          className="btn btn-primary"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {name}
        </div>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <Link to="/profile" className="dropdown-item text-dark">
              Private Profile
            </Link>
          </li>
          <li className="dropdown-divider" />
          <li>
            <LogOutButton thunk={thunk} />
          </li>
        </ul>
      </div>
    </li>
  );
};

export default UserDropdown;
