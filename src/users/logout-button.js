import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const LogOutButton = ({thunk}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutBtn = () => {
    dispatch(thunk());
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
