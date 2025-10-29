import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  todo: number;
  inProgress: number;
  done: number;
}

const TasksStatusChart: React.FC<Props> = ({ todo, inProgress, done }) => {
  const labels = ['To-Do', 'In Progress', 'Done'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Tasks Count',
        data: [todo, inProgress, done],
        backgroundColor: ['#FACC15', '#4F46E5', '#10B981'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Task Status Overview' },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-8">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TasksStatusChart;
