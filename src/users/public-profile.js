import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RenderSongsList } from "../songs/songs-list";
import { findMultipleSongsBySongIDThunk } from "../songs/songs-thunks";
import { findUserByIdThunk } from "./users-thunk";

const PublicProfile = () => {
  const { uid } = useParams();
  const { publicProfile } = useSelector((state) => state.users);
  const { multipleDetails } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (publicProfile) {
      dispatch(findMultipleSongsBySongIDThunk(publicProfile.likes));
    }
  }, [publicProfile]);

  useEffect(() => {
    dispatch(findUserByIdThunk(uid));
  }, [uid])
  
  return (
    <>
      <h1>Public Profile</h1>
      <h1>{publicProfile && publicProfile.username}</h1>
      {
        publicProfile && multipleDetails &&
        <ul className="list-group">
          {
            <RenderSongsList songs={multipleDetails}/>
          }
        </ul>

      }
    </>
  )
}

export default PublicProfile;