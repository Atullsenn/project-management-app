import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutWrapper } from '../compnents/layout/LayoutWrapper';
import { fetchProjectsRequest, deleteProjectRequest } from '../features/projects/projectsSlice';
import { RootState } from '../app/store';
import ProjectModal from '../compnents/modal/ProjectModal';
import { Header } from '../compnents/layout/Header';

const ProjectsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state: RootState) => state.projects);

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchText, setSearchText] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchProjectsRequest());
  }, [dispatch]);

  const projects = Array.isArray(list) ? list : [];
  const filteredProjects = projects.filter(proj =>
    (filterStatus === 'All' || proj.status === filterStatus) &&
    proj.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedProject(null);
    setModalOpen(true);
  };

  const openEditModal = (project: any) => {
    setModalMode('edit');
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleDelete = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProjectRequest(projectId));
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-200 text-gray-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    
    
    <LayoutWrapper>
     <Header title="Projects" />
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">📁 Projects</h2>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-md shadow hover:opacity-90 transition"
          >
            + Create Project
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search by project title..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading && <div className="text-gray-500 mb-4">Loading projects…</div>}
        {error && <div className="text-red-600 font-medium mb-4">{error}</div>}

        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj, index) => (
              <div key={proj.id ?? proj._id}
                   className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{proj.title}</h3>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadgeColor(proj.status)}`}>
                    {proj.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{proj.description || 'No description provided.'}</p>
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="px-4 py-1.5 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id ?? proj._id)}
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
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm">Try changing filters or create a new project.</p>
          </div>
        )}

        {modalOpen && (
          <ProjectModal
            show={modalOpen}
            mode={modalMode}
            project={selectedProject}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </LayoutWrapper>
    
  );
};

export default ProjectsPage;

