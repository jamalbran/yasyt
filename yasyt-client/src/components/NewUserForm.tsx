import React, { useState } from "react";
import { User, Role, Gender, ActiveStatus } from "../entities/user.entity";
import './NewUserForm.css';

interface NewUserFormProps {
  onSave: (newUser: User) => void;
  onCancel: () => void;
}

const NewUserForm: React.FC<NewUserFormProps> = ({ onSave, onCancel }) => {
  const initialUserState: User = {
    id: 0,
    name: "",
    lastname: "",
    email: "",
    phoneNumber: 0,
    address: {
      id: 0,
      number: 0,
      street: "",
      zipCode: 0,
    },
    gender: Gender.PreferNotToSay,
    profileImage: "",
    registerDate: new Date(),
    role: Role.Admin,
    activeUser: ActiveStatus.Active,
  };
  const [newUser, setNewUser] = useState<User>(initialUserState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setNewUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [addressField]: value,
        },
      }));
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };


  const handleSave = () => {
    onSave(newUser);
    setNewUser(initialUserState); // Reset form after saving
  };

  const handleCancel = () => {
    onCancel();
    setNewUser(initialUserState); // Reset form on cancel
  };

  return (
    <div className="new-user-form-container">
      <h3>Create New User</h3>
      <div className="new-user-field">
        <label>
          Name: <input type="text" name="name" value={newUser.name} onChange={handleChange} />
        </label>
      </div>
      <div className="new-user-field">
        <label>
          Lastname: <input type="text" name="lastname" value={newUser.lastname} onChange={handleChange} />
        </label>
      </div>
      <div className="new-user-field">
        <label>
          Email: <input type="text" name="email" value={newUser.email} onChange={handleChange} />
        </label>
      </div>
      <div className="new-user-field">
      <label>
        Phone Number: <input type="text" name="phoneNumber" value={newUser.phoneNumber} onChange={handleChange} />
      </label>
      </div>
      <div className="new-user-field">
        <label>
          Gender:{" "}
          <select name="gender" value={newUser.gender} onChange={handleChange}>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Non-binary">Non-binary</option>
          </select>
        </label>
      </div>
      <div className="new-user-field">
        <label>
          Address Number: <input type="text" name="address.number" value={newUser.address.number} onChange={handleChange} />
        </label>
      </div>
      <div className="new-user-field">
        <label>
          Address Street: <input type="text" name="address.street" value={newUser.address.street} onChange={handleChange} />
        </label>
      </div>
      <div className="new-user-field">
        <label>
          Address Zip Code: <input type="text" name="address.zipCode" value={newUser.address.zipCode} onChange={handleChange} />
        </label>
      </div>
      <div className="new-user-field">
        <label>
          Profile Image: <input type="text" name="profileImage" value={newUser.profileImage} onChange={handleChange} />
        </label>
      </div>
      <div className="new-user-field">
        <label>
          Role:{" "}
          <select name="role" value={newUser.role} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </label>
      </div>
      <div className="new-user-field">
        <label>
          Active User:{" "}
          <select name="activeUser" value={newUser.activeUser} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
      </div>
      <div className="new-user-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default NewUserForm;
