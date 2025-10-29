import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface ProjectsState {
  list: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  list: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    fetchProjectsRequest: (state) => {
      state.loading = true;
    },
    fetchProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProjectsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // New actions:
    createProjectRequest: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        status: string;
      }>
    ) => {
      state.loading = true;
    },
    createProjectSuccess: (state, action: PayloadAction<Project>) => {
      state.list.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProjectRequest: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        description: string;
        status: string;
      }>
    ) => {
      state.loading = true;
    },
    updateProjectSuccess: (state, action: PayloadAction<Project>) => {
      const idx = state.list.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProjectRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteProjectSuccess: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure,
} = projectsSlice.actions;
export default projectsSlice.reducer;
