import { useDispatch } from "react-redux";
import { logoutThunk } from "./users-thunk";
import { useNavigate } from "react-router";

const LogOutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutBtn = () => {
    dispatch(logoutThunk());
    navigate("/login");
  };

  return (
    <>
      <div className="dropdown-item" onClick={handleLogoutBtn}>
        Log out
      </div>
    </>
  );
};

export default LogOutButton;
