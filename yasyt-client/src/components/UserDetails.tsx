import React, { useState, useEffect } from "react";
import { User, Gender, Role, ActiveStatus } from "../entities/user.entity";
import { deleteUserAsync } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import './UserDetails.css';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setEditUser(prevEditUser => ({
      ...prevEditUser,
      address: {
        ...prevEditUser.address,
        [name.includes("address.") ? name.substring(8) : name]: value,
      },
    }));
  };

  const handleSaveChanges = () => {
    onSave(editUser);
  };

  const handleCancelChanges = () => {
    setEditUser(user);
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
    <div className="user-details-container">
      <div className="user-details-buttons">
        {isEditMode ? (
          <>
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={handleCancelChanges}>Cancel</button>
            <button onClick={handleDeleteUser}>Delete User</button>
          </>
        ) : ''}
      </div>
      <div>
        <label className="user-details-field">
          Name:
          <input type="text" name="name" value={editUser.name} onChange={handleChange}  disabled={!isEditMode} />
        </label>
        <label className="user-details-field">
          Lastname:
          <input type="text" name="lastname" value={editUser.lastname} onChange={handleChange} disabled={!isEditMode} />
        </label>
        <label className="user-details-field">
          Email: 
          <input type="text" name="email" value={editUser.email} onChange={handleChange} disabled={!isEditMode} />
        </label>
        <label className="user-details-field">
          Phone Number: <input type="text" name="phoneNumber" value={editUser.phoneNumber} onChange={handleChange} disabled={!isEditMode} />
        </label>
        <label className="user-details-field">
          Gender:{' '}
          <select name="gender" value={editUser.gender} onChange={handleChange} disabled={!isEditMode}>
            {Object.values(Gender).map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>
        <label className="user-details-field">
          Profile Image: <input type="text" name="profileImage" value={editUser.profileImage} onChange={handleChange} disabled={!isEditMode}/>
        </label>
        <label className="user-details-field">
          Address Number: <input type="text" name="address.number" value={editUser.address.number} onChange={handleChange} disabled={!isEditMode} />
        </label>
        <label className="user-details-field">
          Address Street: <input type="text" name="address.street" value={editUser.address.street} onChange={handleChange} disabled={!isEditMode} />
        </label>
        <label className="user-details-field">
          Address Zip Code: <input type="text" name="address.zipCode" value={editUser.address.zipCode} onChange={handleChange} disabled={!isEditMode} />
        </label>
        <label className="user-details-field">
          Role:{' '}
          <select name="role" value={editUser.role} onChange={handleChange} disabled={!isEditMode}>
            {Object.values(Role).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
        <label className="user-details-field">
        Active User:{' '}
          <select name="activeUser" value={editUser.activeUser} onChange={handleChange} disabled={!isEditMode}>
            {Object.values(ActiveStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default UserDetails;
