import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedSpotifyRoute = ({ children }) => {
  const { spotifyProfile } = useSelector((state) => state.spotify);
  if (spotifyProfile) {
    return (children);
  } else {
    return (<Navigate to={'/login'} />);
  }
}

export default ProtectedSpotifyRoute;