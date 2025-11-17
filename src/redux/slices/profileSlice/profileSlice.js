// redux/slices/profileSlice/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/api';

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Unlock badges
export const unlockBadges = createAsyncThunk(
  'profile/unlockBadges',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/user/unlock-badges`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Edit profile
export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async ({ token, profileData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/user/edit-profile`,
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: null, // renamed from user
    badges: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
      state.badges = action.payload.badges || [];
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to fetch profile';
    });

    // Unlock badges
    builder.addCase(unlockBadges.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(unlockBadges.fulfilled, (state, action) => {
      state.loading = false;
      state.profileData = action.payload.data;
      if (!state.badges.includes(action.payload.data)) {
        state.badges.push(action.payload.badge);
      }
    });
    builder.addCase(unlockBadges.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to unlock badge';
    });

    // Edit profile
    builder.addCase(editProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to edit profile';
    });
  },
});

export const { resetProfileError } = profileSlice.actions;
export default profileSlice.reducer;
