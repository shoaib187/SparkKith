import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/api";

// create task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ taskData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/user/tasks/create`, taskData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating task");
    }
  }
);

// update taks
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, done }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${baseUrl}/api/user/tasks/update`, {
        taskId,
        done,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating task");
    }
  }
);

// mark as done taks
export const markAsDoneTask = createAsyncThunk(
  "tasks/markAsDoneTask",
  async ({ taskId, done, token }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${baseUrl}/api/user/tasks/mark-done`, {
        taskId,
        done,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("markAsDoneTask", res)
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating task");
    }
  }
);

// mark as undo taks
export const undoTask = createAsyncThunk(
  "tasks/undoTask",
  async ({ taskId, done, token }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${baseUrl}/api/user/tasks/undo-task`, {
        taskId,
        // done,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating task");
    }
  }
);

// get today's tasks
export const getTodayTasks = createAsyncThunk(
  "tasks/getTodayTasks",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/user/tasks/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching today's tasks");
    }
  }
);


// get weekly ranking
export const getWeeklyRankings = createAsyncThunk(
  "tasks/getWeeklyRankings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/weekly-rankings/get`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching rankings");
    }
  }
);
// get weekly ranking
export const getWeeklyCommunityRankings = createAsyncThunk(
  "tasks/getWeeklyCommunityRankings",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/spark-ranking`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching rankings");
    }
  }
);

// tasksSlice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    rankings: [],
    communityRanking: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload.data); // push new task
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data;
        state.tasks = state.tasks.map(task =>
          task._id === updated.taskId ? { ...task, done: updated.done } : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // mark as done task
      .addCase(markAsDoneTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsDoneTask.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data;
        state.tasks = state.tasks.map(task =>
          task._id === updated.taskId ? { ...task, done: true } : task
        );
      })
      .addCase(markAsDoneTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // undo task
      .addCase(undoTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(undoTask.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data;
        state.tasks = state.tasks.map(task =>
          task._id === updated.taskId ? { ...task, done: false } : task
        );
      })
      .addCase(undoTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get today's tasks
      .addCase(getTodayTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodayTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks; // replace current tasks with today's tasks
      })
      .addCase(getTodayTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // weekly rankings
      .addCase(getWeeklyRankings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeeklyRankings.fulfilled, (state, action) => {
        state.loading = false;
        state.rankings = action.payload.data;
      })
      .addCase(getWeeklyRankings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // weekly rankings community
      .addCase(getWeeklyCommunityRankings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeeklyCommunityRankings.fulfilled, (state, action) => {
        state.loading = false;
        state.communityRanking = action.payload.rankings;
      })
      .addCase(getWeeklyCommunityRankings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tasksSlice.reducer;
