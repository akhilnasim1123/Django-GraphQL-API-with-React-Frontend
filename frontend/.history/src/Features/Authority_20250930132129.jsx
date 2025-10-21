import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import cookie from 'cookie';


export const login = createAsyncThunk(
  'authority/login',
  async ({ username, password }, thunkAPI) => {
    
        variables: { username, password }
 if (data?.tokenAuth?.token) {
        localStorage.setItem('token', data.tokenAuth.token);
        localStorage.setItem('refreshToken', data.tokenAuth.refreshToken);
        setSuccess('Login successful! Redirecting...');
        navigate('/dashboard');
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err) {
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        setError(err.graphQLErrors[0].message);
      } else {
        setError('Login failed. Please try again.');
      }
    }

    setIsSubmitting(false);
  )