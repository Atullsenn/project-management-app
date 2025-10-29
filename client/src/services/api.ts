import axiosInstance from '../axios/axiosInstance';



export const registerApi = async (credentials: { email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/register', credentials);
  return response.data.data;
};

export const loginApi = async (credentials: { email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data.data;
};

export const fetchProjectsApi = async () => {
  const response = await axiosInstance.get('/projects');
  console.log('Fetch Projects API response data:', response.data);
  return response.data;
};


export const createProjectApi = async (projectData: {
  title: string;
  description: string;
  status: string;
}) => {
  try {
    const response = await axiosInstance.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProjectApi = async (
  projectId: string,
  projectData: { title: string; description: string; status: string; }
) => {
  try {
    const response = await axiosInstance.put(`/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    throw error;
  }
};

// ** Delete project **
export const deleteProjectApi = async (projectId: string) => {
  try {
    const response = await axiosInstance.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    throw error;
  }
};



// export const fetchTasksApi = async (userId: string, status: string) => {
//   const response = await axiosInstance.get(`/projects/tasks/68fd0e3de052ec739e0427e9`, {
//     params: { status },
//   });
//   return response.data.data;
// };




export const fetchTasksApi = async () => {
  const response = await axiosInstance.get('/tasks');
  return response.data.data;
};



export const fetchDashboard = async () => {
  const response = await axiosInstance.get('/dashboard');
  return response.data.data;
};

// export const createTaskApi = async (projectId: string, taskData: {
//   title: string;
//   description: string;
//   status: string;
//   dueDate: string;
// }) => {
//   const response = await axiosInstance.post(`/tasks/${projectId}`, taskData);
//   console.log('Create Task API response:', response.data);
//   return response.data.data;
// };



// export const updateTaskApi = async (taskId: string, taskData: {
//   title: string;
//   description: string;
//   status: string;
//   dueDate: string;
// }) => {
//   const response = await axiosInstance.put(`/tasks/${taskId}`, taskData);
//   console.log('Update Task API response:', response.data);
//   return response.data.data;
// };

// export const deleteTaskApi = async (taskId: string) => {
//   const response = await axiosInstance.delete(`/tasks/${taskId}`);
//   return response.data.data;
// };



export const createTaskApi = async (projectId: string, data: any) => {
  console.log('Creating task with data:', data);
  return await axiosInstance.post(`/tasks/${projectId}`, data);
};

export const updateTaskApi = async (id: string, data: any) => {
  return await axiosInstance.put(`/tasks/${id}`, data);
};

// export const fetchTasksApi = async () => {
//   return await axiosInstance.get('/tasks');
// };

export const deleteTaskApi = async (id: string) => {
  return await axiosInstance.delete(`/tasks/${id}`);
};

