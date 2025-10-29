// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   createTaskRequest,
//   updateTaskRequest
// } from '../../features/tasks/tasksSlice';

// interface Task {
//   id?: string;
//   title: string;
//   description: string;
//   status: string;
//   dueDate: string;
//   project?: any;
// }

// interface Props {
//   show: boolean;
//   mode: 'create' | 'edit';
//   task?: Task | null;
//   projectId?: string;
//   onClose: () => void;
// }

// const TaskModal: React.FC<Props> = ({ show, mode, task, projectId, onClose }) => {
//   const dispatch = useDispatch();

//   const [title, setTitle] = useState(task?.title || '');
//   const [description, setDescription] = useState(task?.description || '');
//   const [status, setStatus] = useState(task?.status || 'todo');
//   const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.split('T')[0] : '');

//   useEffect(() => {
//     if (mode === 'edit' && task) {
//       setTitle(task.title);
//       setDescription(task.description);
//       setStatus(task.status);
//       setDueDate(task.dueDate.split('T')[0]);
//     }
//     if (mode === 'create') {
//       setTitle('');
//       setDescription('');
//       setStatus('todo');
//       setDueDate('');
//     }
//   }, [mode, task, show]);

//   useEffect(() => {
//     if (show) document.body.style.overflow = 'hidden';
//     else document.body.style.overflow = '';
//     return () => { document.body.style.overflow = ''; };
//   }, [show]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (mode === 'create' && projectId) {
//       dispatch(createTaskRequest({ projectId, title, description, status, dueDate }));
//     } else if (mode === 'edit' && task) {
//       dispatch(updateTaskRequest({ id: task.id!, title, description, status, dueDate }));
//     }
//     onClose();
//   };

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//       <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           ×
//         </button>
//         <h2 className="text-2xl font-bold mb-4">
//           {mode === 'create' ? 'Create Task' : 'Edit Task'}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="task-title" className="block mb-1 text-sm font-medium text-gray-700">Title</label>
//             <input
//               id="task-title"
//               type="text"
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="task-desc" className="block mb-1 text-sm font-medium text-gray-700">Description</label>
//             <textarea
//               id="task-desc"
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//               required
//               rows={3}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="task-status" className="block mb-1 text-sm font-medium text-gray-700">Status</label>
//             <select
//               id="task-status"
//               value={status}
//               onChange={e => setStatus(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="todo">To Do</option>
//               <option value="in-progress">In Progress</option>
//               <option value="done">Done</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="task-due" className="block mb-1 text-sm font-medium text-gray-700">Due Date</label>
//             <input
//               id="task-due"
//               type="date"
//               value={dueDate}
//               onChange={e => setDueDate(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex justify-end space-x-3 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
//             >Cancel</button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//             >{mode === 'create' ? 'Create Task' : 'Save Changes'}</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskModal;






// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   createTaskRequest,
//   updateTaskRequest
// } from '../../features/tasks/tasksSlice';

// interface ProjectOption {
//   _id: string;
//   title: string;
// }

// interface Task {
//   _id?: string;
//   title: string;
//   description: string;
//   status: string;
//   dueDate: string;
//   project?: any;
// }

// interface Props {
//   show: boolean;
//   mode: 'create' | 'edit';
//   task?: Task | null;
//   projects: ProjectOption[];
//   projectIdForCreate?: string;
//   onClose: () => void;
// }

// const TaskModal: React.FC<Props> = ({
//   show,
//   mode,
//   task,
//   projects,
//   projectIdForCreate,
//   onClose
// }) => {
//   const dispatch = useDispatch();

//   const [projectId, setProjectId] = useState<string>(projectIdForCreate || '');
//   const [title, setTitle] = useState(task?.title || '');
//   const [description, setDescription] = useState(task?.description || '');
//   const [status, setStatus] = useState(task?.status || 'todo');
//   const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.split('T')[0] : '');

//   useEffect(() => {
//     if (mode === 'edit' && task) {
//       setProjectId(task.project?._id || '');
//       setTitle(task.title);
//       setDescription(task.description);
//       setStatus(task.status);
//       setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
//     }
//     if (mode === 'create') {
//       setProjectId(projectIdForCreate || '');
//       setTitle('');
//       setDescription('');
//       setStatus('todo');
//       setDueDate('');
//     }
//   }, [mode, task, projectIdForCreate, show]);

//   useEffect(() => {
//     if (show) document.body.style.overflow = 'hidden';
//     else document.body.style.overflow = '';
//     return () => { document.body.style.overflow = '' };
//   }, [show]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (mode === 'create') {
//       dispatch(createTaskRequest({ projectId, title, description, status, dueDate }));
//     } else if (mode === 'edit' && task) {
//       dispatch(updateTaskRequest({ id: task._id!, projectId, title, description, status, dueDate }));
//     }
//     onClose();
//   };

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//       <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-bold mb-4">
//           {mode === 'create' ? 'Create Task' : 'Edit Task'}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="task-project" className="block mb-1 text-sm font-medium text-gray-700">
//               Project <span className="text-red-500">*</span>
//             </label>
//             <select
//               id="task-project"
//               value={projectId}
//               onChange={e => setProjectId(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Project</option>
//               {projects.map(proj => (
//                 <option key={proj._id} value={proj._id}>{proj.title}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="task-title" className="block mb-1 text-sm font-medium text-gray-700">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="task-title"
//               type="text"
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="task-desc" className="block mb-1 text-sm font-medium text-gray-700">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               id="task-desc"
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//               required
//               rows={4}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="task-status" className="block mb-1 text-sm font-medium text-gray-700">
//               Status
//             </label>
//             <select
//               id="task-status"
//               value={status}
//               onChange={e => setStatus(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="todo">To Do</option>
//               <option value="in-progress">In Progress</option>
//               <option value="done">Done</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="task-due" className="block mb-1 text-sm font-medium text-gray-700">
//               Due Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="task-due"
//               type="date"
//               value={dueDate}
//               onChange={e => setDueDate(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex justify-end space-x-3 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//             >
//               {mode === 'create' ? 'Create Task' : 'Save Changes'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskModal;



import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createTaskRequest,
  updateTaskRequest
} from '../../features/tasks/tasksSlice';

interface ProjectOption {
  _id: string;
  title: string;
}

interface Task {
  _id?: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  project?: any;
}

interface Props {
  show: boolean;
  mode: 'create' | 'edit';
  task?: Task | null;
  projects: ProjectOption[];
  projectIdForCreate?: string;
  onClose: () => void;
}

const TaskModal: React.FC<Props> = ({
  show,
  mode,
  task,
  projects,
  projectIdForCreate,
  onClose
}) => {
  const dispatch = useDispatch();

  const [projectId, setProjectId] = useState<string>(projectIdForCreate || '');
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'todo');
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.split('T')[0] : '');

  useEffect(() => {
    if (mode === 'edit' && task) {
      setProjectId(task.project?._id || '');
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    }
    if (mode === 'create') {
      setProjectId(projectIdForCreate || '');
      setTitle('');
      setDescription('');
      setStatus('todo');
      setDueDate('');
    }
  }, [mode, task, projectIdForCreate, show]);

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = '' };
  }, [show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      dispatch(createTaskRequest({ projectId, title, description, status, dueDate }));
    } else if (mode === 'edit' && task) {
      dispatch(updateTaskRequest({ id: task._id!, projectId, title, description, status, dueDate }));
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {mode === 'create' ? 'Create Task' : 'Edit Task'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task-project" className="block mb-1 text-sm font-medium text-gray-700">
              Project <span className="text-red-500">*</span>
            </label>
            <select
              id="task-project"
              value={projectId}
              onChange={e => setProjectId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Project</option>
              {projects.map(proj => (
                <option key={proj._id} value={proj._id}>{proj.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="task-title" className="block mb-1 text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="task-desc" className="block mb-1 text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="task-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="task-status" className="block mb-1 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="task-status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-due" className="block mb-1 text-sm font-medium text-gray-700">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              id="task-due"
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {mode === 'create' ? 'Create Task' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
