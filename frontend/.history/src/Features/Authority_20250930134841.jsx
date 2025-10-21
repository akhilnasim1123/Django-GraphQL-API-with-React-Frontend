import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Swal from "sweetalert2";
import cookie from 'cookie';
import { LOGIN_MUTATION } from "../Mutation";
import client from "../ApolloProvider";


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, thunkAPI) => {
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { username, password },
      });

      if (data?.tokenAuth?.token) {
        localStorage.setItem('token', data.tokenAuth.token);
        localStorage.setItem('refreshToken', data.tokenAuth.refreshToken);
        const { me } = await client.query();
        
        return data.tokenAuth;
      } else {
        return thunkAPI.rejectWithValue('No token returned');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    error: null,
    loading:false,
    isAuthenticated:false
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated=false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      state.isAuthenticated=false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
      state.isAuthenticated=true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      state.isAuthenticated=false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
