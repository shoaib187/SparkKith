import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/api";


// create
export const createFeeling = createAsyncThunk(
  "feeling/createFeeling",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/user/feeling/create`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get/by-date
export const getFeelingsByDate = createAsyncThunk(
  "feeling/getFeelingsByDate",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/user/feeling/get/by-date`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get-analytics
export const getFeelingAnalytics = createAsyncThunk(
  "feeling/getFeelingAnalytics",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/user/feeling/get-analytics`, payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// feeling slice main
const feelingSlice = createSlice({
  name: "feeling",
  initialState: {
    feelingCreated: null,
    feelingsByDate: [],
    analytics: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // craete feeling
    builder
      .addCase(createFeeling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFeeling.fulfilled, (state, action) => {
        state.loading = false;
        state.feelingCreated = action.payload;
      })
      .addCase(createFeeling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // get feeling by date
    builder
      .addCase(getFeelingsByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeelingsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.feelingsByDate = action.payload?.data;
      })
      .addCase(getFeelingsByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // get analytics
    builder
      .addCase(getFeelingAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeelingAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(getFeelingAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feelingSlice.reducer;
