export interface User {
  email: string;
  token: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}
