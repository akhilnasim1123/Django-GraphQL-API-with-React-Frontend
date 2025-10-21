import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Swal from "sweetalert2";
import cookie from 'cookie';
import { LOGIN_MUTATION } from "../Mutation";
import client from "../ApolloProvider";
import { WHOAMI } from "../Queries";
import { useQuery } from '@apollo/client/react'


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, thunkAPI) => {
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { username, password },
      });

      if (data?.tokenAuth?.token) {
        const token = data.tokenAuth.token;
        const refreshToken = data.tokenAuth.refreshToken;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        await thunkAPI.dispatch(getUser());
         
        return { token, refreshToken };
      } else {
        return thunkAPI.rejectWithValue('No token returned');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No token found');
      }

      const { data } = await client.query({
        query: WHOAMI,
        context: {
          headers: {
            Authorization: `JWT ${token}`,
          },
        },
        fetchPolicy: 'no-cache',
      });
      console.log(data)

      return data.whoami;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch user');
    }
  }
);

export const verifyToken = 



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    error: null,
    loading: false,
    isAuthenticated: false
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
