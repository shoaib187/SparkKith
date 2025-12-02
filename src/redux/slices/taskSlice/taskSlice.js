import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/api";

// create task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ taskId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/user/tasks/create`, { taskId }, {
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

// get suggestions
export const getTaskSuggestions = createAsyncThunk(
  "tasks/getTaskSuggestions",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/user/tasks/get-suggestions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log("res data is", res.data)
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
  async ({ taskId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${baseUrl}/api/user/tasks/mark-done`, {
        taskId
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
  async ({ taskId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${baseUrl}/api/user/tasks/undo-task`, {
        taskId,
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
// mark as undo taks
export const skipTask = createAsyncThunk(
  "tasks/skipTask",
  async ({ taskId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${baseUrl}/api/user/tasks/skip-task`, {
        taskId,
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
// get triggered tasks
export const getTriggeredTasks = createAsyncThunk(
  "tasks/getTriggeredTasks",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/user/tasks/get-trigger-tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log("res data", res.data)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching triggered tasks");
    }
  }
);

// get triggered tasks
export const getTaskAnalytics = createAsyncThunk(
  "tasks/getTaskAnalytics",
  async ({ token, period }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/user/tasks/get-analytics?period=${period}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching analytics tasks");
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
    triggeredTasks: [],
    suggestions: [],
    taskAnalytics: null,
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
      // undo task
      .addCase(skipTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(skipTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(skipTask.rejected, (state, action) => {
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
      // get triggered's tasks
      .addCase(getTriggeredTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTriggeredTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.triggeredTasks = action.payload.data;
      })
      .addCase(getTriggeredTasks.rejected, (state, action) => {
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
      })
      // get task analytics
      .addCase(getTaskAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.taskAnalytics = action.payload;
      })
      .addCase(getTaskAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get suggestions
      .addCase(getTaskSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload.tasks?.tasks;
      })
      .addCase(getTaskSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tasksSlice.reducer;
