// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Task {
//   id: string;
//   title: string;
//   completed: boolean;
// }

// interface TasksState {
//   list: Task[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TasksState = {
//   list: [],
//   loading: false,
//   error: null,
// };

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     fetchTasksRequest: (state) => {
//       state.loading = true;
//     },
//     fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
//       state.list = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     fetchTasksFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure } = tasksSlice.actions;
// export default tasksSlice.reducer;







// features/tasks/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  project: {
    _id: string;
    title: string;
    description: string;
    status: string;
    owner: string;
  };
  // other fields...
}

interface TasksState {
  list: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  list: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksRequest: state => { state.loading = true; },
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTasksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    createTaskRequest: (state, action: PayloadAction<{ projectId: string; title: string; description: string; status: string; dueDate: string; }>) => {
      state.loading = true;
    },
    createTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.list.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    createTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateTaskRequest: (state, action: PayloadAction<{ id: string; projectId: string; title: string; description: string; status: string; dueDate: string; }>) => {
      state.loading = true;
    },
    updateTaskSuccess: (state, action: PayloadAction<Task>) => {
      const idx = state.list.findIndex(t => t._id === action.payload._id);
      if (idx >= 0) {
        state.list[idx] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTaskRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteTaskSuccess: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(t => t._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} = tasksSlice.actions;

export default tasksSlice.reducer;
