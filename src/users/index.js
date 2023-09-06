import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUserThunk, findAllUsersThunk } from "./users-thunk";
import { Link } from "react-router-dom";

const Users = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAllUsersThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteUser = (uid) => {
    dispatch(deleteUserThunk(uid));
    dispatch(findAllUsersThunk());
  };

  return (
    <>
      <h1>Users</h1>
      <div className="list-group">
        {users.map((user) => (
          <div
            className="list-group-item row d-flex align-items-center"
            key={user._id}
          >
            <Link to={`/profile/${user._id}`} className="col-10">
              {user.username}
            </Link>
            <div className="col-2">
              <button
                className="btn btn-danger float-end"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
