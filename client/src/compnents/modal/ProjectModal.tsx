import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createProjectRequest,
  updateProjectRequest
} from '../../features/projects/projectsSlice';

interface Project {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  status: string;
}

interface Props {
  show: boolean;
  mode: 'create' | 'edit';
  project?: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<Props> = ({ show, mode, project, onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (mode === 'edit' && project) {
      setTitle(project.title);
      setDescription(project.description);
      setStatus(project.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('Active');
    }
  }, [mode, project, show]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      dispatch(createProjectRequest({ title, description, status }));
    } else if (mode === 'edit' && project) {
      const projectId = project.id ?? project._id;
      if (!projectId) {
        console.warn('Cannot update project — missing id');
        return;
      }
      dispatch(updateProjectRequest({ id: projectId, title, description, status }));
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {mode === 'create' ? 'Create Project' : 'Edit Project'}
        </h2>

        {mode === 'edit' && project && (
          <div className="mb-4 text-sm text-gray-500">
            Project ID: <span className="font-medium">{project.id ?? project._id}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="proj-title" className="block mb-1 text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="proj-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="proj-desc" className="block mb-1 text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="proj-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="proj-status" className="block mb-1 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="proj-status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
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
              {mode === 'create' ? 'Create Project' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
