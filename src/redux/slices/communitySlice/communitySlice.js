import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/api';

// fetc top performers
export const fetchTopPerformers = createAsyncThunk(
  'topPerformers/fetchTopPerformers',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/top-performer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const communitySlice = createSlice({
  name: 'topPerformers',
  initialState: {
    performers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopPerformers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopPerformers.fulfilled, (state, action) => {
        state.loading = false;
        state.performers = action.payload?.users;
      })
      .addCase(fetchTopPerformers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default communitySlice.reducer;
