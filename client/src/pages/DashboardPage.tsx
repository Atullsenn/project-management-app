import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardRequest } from '../features/dashboard/dashboardSlice';
import { RootState } from '../app/store';
import { LayoutWrapper } from '../compnents/layout/LayoutWrapper';
import TasksStatusChart from '../compnents/charts/TasksStatusChart';
import { Header } from '../compnents/layout/Header';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const dashboardState = useSelector((state: RootState) => state.dashboard);
  const data = dashboardState?.data;
  const loading = dashboardState?.loading;
  const error = dashboardState?.error;

  useEffect(() => {
    dispatch(fetchDashboardRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="text-center py-12 text-gray-600 animate-pulse">Loading Dashboard…</div>
      </LayoutWrapper>
    );
  }

  if (error) {
    return (
      <LayoutWrapper>
        <div className="text-center py-12 text-red-500 font-medium">{error}</div>
      </LayoutWrapper>
    );
  }

  return (
    <>
     
    <LayoutWrapper>
      <Header title='Dashboard'/>
      <div className="mb-8 py-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Overview of your projects & tasks</p>
      </div>

      {data ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">Active Projects</h3>
              <p className="text-3xl font-bold">{data.projects.active}</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">Completed Projects</h3>
              <p className="text-3xl font-bold">{data.projects.completed}</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">Inactive Projects</h3>
              <p className="text-3xl font-bold">{data.projects.inactive}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">To-Do Tasks</h3>
              <p className="text-3xl font-bold">{data.tasks.todo}</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">In-Progress Tasks</h3>
              <p className="text-3xl font-bold">{data.tasks['in-progress']}</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">Done Tasks</h3>
              <p className="text-3xl font-bold">{data.tasks.done}</p>
            </div>
          </div>

          {/* Chart */}
          <TasksStatusChart
            todo={data.tasks.todo}
            inProgress={data.tasks['in-progress']}
            done={data.tasks.done}
          />
        </>
      ) : (
        <div className="text-gray-600 text-center py-12">No dashboard data available.</div>
      )}
    </LayoutWrapper>
    </>
  );
};

export default DashboardPage;
