import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchUsers,
  selectUser,
  clearSelectedUser,
  updateUserAsync,
  addUser,
} from "../redux/userSlice";
import { User } from "../entities/user.entity";
import UserDetails from "./UserDetails";
import NewUserForm from "./NewUserForm";
import './UserList.css';

const UserList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNewUserFormVisible, setNewUserFormVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSelectUser = (userId: number) => {
    dispatch(selectUser(userId));
    setIsEditMode(false);
  };

  const handleEditUser = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = async (updatedUser: User) => {
    try {
      await dispatch(updateUserAsync(updatedUser));
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancelChanges = () => {
    setIsEditMode(false);
  };

  const handleCloseDetails = () => {
    dispatch(clearSelectedUser());
    setIsEditMode(false);
  };

  const handleCreateNewUser = () => {
    setNewUserFormVisible(true);
  };

  const handleSaveNewUser = (newUser: User) => {
    dispatch(addUser(newUser));
    setNewUserFormVisible(false);
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <button onClick={handleCreateNewUser}>Create New User</button>
      {isNewUserFormVisible ? (
        <NewUserForm onSave={handleSaveNewUser} onCancel={() => setNewUserFormVisible(false)} />
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={user.id}>
              {user.name} {user.lastname}
              {selectedUser?.id === user.id ? (
                isEditMode ? '' : (
                  <div>
                    <button onClick={handleEditUser}>Edit Details</button>
                    <button onClick={() => handleCloseDetails()}>Close Details</button>
                  </div>
                )
              ) : (
                <button onClick={() => handleSelectUser(user.id)}>View Details</button>
              )}
              {selectedUser && selectedUser.id === user.id && (
                <UserDetails
                  key={`details-${user.id}`}
                  user={selectedUser}
                  isEditMode={isEditMode}
                  onSave={handleSaveChanges}
                  onCancel={handleCancelChanges}
                  onClose={handleCloseDetails}
                />
              )}
              {index < users.length - 1 && <hr />}
            </li>
          ))}
        </ul>
        )}
    </div>
  );
};

export default UserList;
