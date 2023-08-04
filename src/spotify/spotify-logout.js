import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { spotifyLogoutThunk } from "./spotify-thunks";

const SpotifyLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutBtn = () => {
    dispatch(spotifyLogoutThunk());
    navigate("/login");
  };

  return (
    <>
      <div className="btn btn-danger" onClick={handleLogoutBtn}>
        Log out
      </div>
    </>
  );
};

export default SpotifyLogout;