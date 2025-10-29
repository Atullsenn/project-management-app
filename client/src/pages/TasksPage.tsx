import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutWrapper } from '../compnents/layout/LayoutWrapper';
import {
  fetchTasksRequest,
  deleteTaskRequest,
} from '../features/tasks/tasksSlice';
import { RootState } from '../app/store';
import TaskModal from '../compnents/modal/TaskModal';
import { fetchProjectsApi } from '../services/api';
import { Header } from '../compnents/layout/Header';
const TasksPage: React.FC = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state: RootState) => state.tasks);

  const [projects, setProjects] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  // const [projectIdForCreate, setProjectIdForCreate] = useState<string>('');
  const [projectIdForCreate] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    dispatch(fetchTasksRequest());
    loadProjects();
  }, [dispatch]);

  const loadProjects = async () => {
    try {
      const resp = await fetchProjectsApi();
      if (resp?.data) {
        setProjects(resp.data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task: any) => {
    setModalMode('edit');
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDelete = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTaskRequest(taskId));
    }
  };

  // Filter + Search with safety checks
  const filteredTasks = list.filter((task) => {
    const titleSafe = (task.title || '').toString().toLowerCase();
    const searchSafe = searchText.toLowerCase();
    const matchesSearch = titleSafe.includes(searchSafe);

    const statusSafe = (task.status || '').toString().toLowerCase();
    const filterSafe = filterStatus === 'All' || statusSafe === filterStatus.toLowerCase();

    return matchesSearch && filterSafe;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-yellow-100 text-yellow-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'done':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <LayoutWrapper>
      <Header title='Tasks'/>
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">📝 Tasks</h2>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-md shadow hover:opacity-90 transition"
          >
            + Create Task
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search tasks by title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {loading && <div className="text-gray-500 mb-4">Loading tasks…</div>}
        {error && <div className="text-red-600 font-medium mb-4">{error}</div>}

        {/* Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-6 relative transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{task.title}</h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">{task.description}</p>
                    <div className="text-sm text-gray-500">
                      Project:{' '}
                      <span className="font-medium text-gray-700">
                        {task.project?.title || 'N/A'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Due:{' '}
                      <span className="font-medium">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="mt-5 flex justify-end space-x-3">
                  <button
                    onClick={() => openEditModal(task)}
                    className="px-4 py-1.5 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm">Try changing filters or create a new task.</p>
          </div>
        )}

        {modalOpen && (
          <TaskModal
            show={modalOpen}
            mode={modalMode}
            task={selectedTask}
            projects={projects}
            projectIdForCreate={projectIdForCreate}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </LayoutWrapper>
  );
};

export default TasksPage;

