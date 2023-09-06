import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RenderSongsList } from "../songs/songs-list";
import { findUserByIdThunk } from "./users-thunk";

const PublicProfile = () => {
  const { uid } = useParams();
  const { publicProfile } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findUserByIdThunk(uid));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  return (
    <>
      <h1>Public Profile</h1>
      <h1>{publicProfile && publicProfile.username}</h1>
      
        <ul className="list-group">
          {
            publicProfile && <RenderSongsList songs={publicProfile.likesData} />
          }
        </ul>
      
    </>
  )
}

export default PublicProfile;