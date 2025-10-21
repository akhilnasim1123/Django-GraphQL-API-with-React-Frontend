import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Swal from "sweetalert2";
import cookie from 'cookie';
import { CREATE_DEPARTMENT, LOGIN_MUTATION, REVOKE_TOKEN, UPDATE_DEPARTMENT, VERIFY_TOKEN } from "../Mutation";
import client from "../ApolloProvider";
import { DEPARTMENTS, USERS, WHOAMI } from "../Queries";
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

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await client.mutate({
          mutation: REVOKE_TOKEN,
          variables: { refreshToken },
        });
      }
    } catch (error) {
      console.warn('Failed to revoke token:', error.message);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return true;
  }
);


export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (token, thunkAPI) => {
    try {
      const { data } = await client.mutate({
        mutation: VERIFY_TOKEN,
        variables: { token },
      });

      if (data?.verifyToken?.payload) {

        await thunkAPI.dispatch(getUser());
        return {
          payload: data.verifyToken.payload,
          token,
        };
      } else {
        return thunkAPI.rejectWithValue("Invalid token");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Token verification failed");
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
            Authorization: `Bearer  ${token}`,  
          },
        },
        fetchPolicy: 'no-cache',
      });

      return data.whoami;
    } catch (error) {
      print(error) 
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch user');
    }
  }
);


export const createDepartment = createAsyncThunk(
  "departments/createDepartment",
  async ({ name, image, lead }, thunkAPI) => {
    console.log(name)
    try {
      const { data } = await client.mutate({
        mutation: CREATE_DEPARTMENT,
        variables: { name, image, lead },
      });
      console.log(data.createDepartment.department)
      if (data?.createDepartment?.department) {
        return data.createDepartment.department;
      } else {
        return thunkAPI.rejectWithValue("Failed to create department");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Mutation failed");
    }
  }
);

export const updateDepartment = createAsyncThunk(
  'auth/updateDepartment',
  async ({id,name,image,lead},thunkAPI)=>{
    try{
      const {data} = await client.mutate({
        mutation:UPDATE_DEPARTMENT,
        variables:{id,name,image,lead}
      });
      if (data?.)
    }catch(e){

    }
  }
)

export const getDepartments = createAsyncThunk(
  'auth/departments',
  async (_, thunkAPI) => {  // no need to pass user here
    try {
      const { data } = await client.query({
        query: DEPARTMENTS,
        fetchPolicy: 'no-cache',
      });

      if (data.departments) {
        return data.departments;  
      } else {
        return thunkAPI.rejectWithValue("No departments found");
      }
    } catch (error) {
      console.error("Error in getDepartments thunk:", error);
      return thunkAPI.rejectWithValue(error.message || "Error fetching departments");
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
    loading: false,
    isAuthenticated: false,
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
      }).addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token
      })
      .addCase(verifyToken.rejected, (state, action) => {

        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.token = null;
      })
      // .addCase(getDepartments.pending, (state, action) => {
      //   state.loading = true;
      // }) 
      // .addCase(getDepartments.fulfilled, (state, action) => {
      //   state.loading = false;
      // })
      //       .addCase(getDepartments.pending, (state) => {
      //   state.loading = true;
      // }) 
      .addCase(getDepartments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
