export class DashboardResponseDto {
  projects: {
    active: number;
    completed: number;
    inactive: number;
  };
  tasks: {
    todo: number;
    'in-progress': number;
    done: number;
  };
}
