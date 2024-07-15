import React, { useState, useEffect } from "react";
import { User } from "../entities/user.entity";
import { deleteUserAsync } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";

interface UserDetailsProps {
  user: User;
  isEditMode: boolean;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, isEditMode, onSave, onCancel, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const [editUser, setEditUser] = useState({ ...user });

  useEffect(() => {
    setEditUser({ ...user });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    onSave(editUser);
  };

  const handleCancelChanges = () => {
    onCancel();
  };

  const handleDeleteUser = async () => {
    if (window.confirm(`Are you sure you want to delete ${user.name} ${user.lastname}?`)) {
      try {
        await dispatch(deleteUserAsync(user.id));
        onClose();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div>
      {isEditMode ? (
        <form>
          <label>
            Name:
            <input type="text" name="name" value={editUser.name} onChange={handleChange} />
          </label>
          <label>
            Lastname:
            <input type="text" name="lastname" value={editUser.lastname} onChange={handleChange} />
          </label>
        </form>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Lastname: {user.lastname}</p>
        </div>
      )}
      {isEditMode ? (
        <div>
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={handleCancelChanges}>Cancel Changes</button>
        </div>
      ) : ''}
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
};

export default UserDetails;
