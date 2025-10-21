import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import cookie from 'cookie';


export const login = createAsyncThunk(
  'authority/login',
  async ({ username, password }, thunkAPI) => {
    const body = JSON.stringify({ username, password });
  })