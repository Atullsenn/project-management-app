import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardProjectsCount {
  active: number;
  completed: number;
  inactive: number;
}

interface DashboardTasksCount {
  todo: number;
  'in-progress': number;
  done: number;
}

interface DashboardState {
  data: {
    projects: DashboardProjectsCount;
    tasks: DashboardTasksCount;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (
      state,
      action: PayloadAction<{ projects: DashboardProjectsCount; tasks: DashboardTasksCount }>
    ) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchDashboardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
