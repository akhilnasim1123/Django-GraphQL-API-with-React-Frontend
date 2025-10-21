import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import cookie from 'cookie';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, thunkAPI) => {
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { username, password },
      });

      if (data?.tokenAuth?.token) {
        // Save to localStorage
        localStorage.setItem('token', data.tokenAuth.token);
        localStorage.setItem('refreshToken', data.tokenAuth.refreshToken);

        return data.tokenAuth;
      } else {
        return thunkAPI.rejectWithValue('No token returned');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
  }
);