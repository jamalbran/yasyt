import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../entities/user.entity";
import {
  findAllUser,
  updateUser,
  deleteUser,
  createUser,
} from "../services/user-service";
import { AppThunk } from "./store";

interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    selectUser: (state, action: PayloadAction<number>) => {
      const selected = state.users.find((user) => user.id === action.payload);
      state.selectedUser = selected || null;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
        state.selectedUser = updatedUser;
      }
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const {
  setUsers,
  selectUser,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  clearSelectedUser,
  addUser,
} = userSlice.actions;

export const fetchUsers = (): AppThunk => async (dispatch) => {
  try {
    const data = await findAllUser();
    if (data) {
      dispatch(setUsers(data));
    } else {
      dispatch(setUsers([]));
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const updateUserAsync =
  (user: User): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updateUserStart());
      await updateUser(user);
      dispatch(updateUserSuccess(user));
    } catch (error: any) {
      dispatch(updateUserFailure(error.message));
      console.error("Error updating user:", error);
    }
  };

export const deleteUserAsync =
  (userId: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(deleteUserStart());
      await deleteUser(userId);
      dispatch(deleteUserSuccess(userId));
    } catch (error: any) {
      dispatch(deleteUserFailure(error.message));
      console.error("Error deleting user:", error);
    }
  };

export const createUserAsync =
  (user: User): AppThunk =>
  async (dispatch) => {
    try {
      await createUser(user);
      dispatch(addUser(user));
    } catch (error: any) {
      console.error("Error creating user:", error);
    }
  };

export default userSlice.reducer;
