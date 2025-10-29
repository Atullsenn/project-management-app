import { Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDocument } from '../../schemas/project.schema';   // adjust path
import { TaskDocument } from '../../schemas/task.schema';           // adjust path

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<ProjectDocument>,
    @InjectModel('Task') private readonly taskModel: Model<TaskDocument>,
  ) {}

  async getUserDashboard(userId: string) {
    // if (!Types.ObjectId.isValid(userId)) {
    //   throw new BadRequestException('Invalid user id');
    // }

    console.log(userId, "checkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    const userObjectId = new Types.ObjectId(userId);

    const [ activeCount, completedCount, inactiveCount ] = await Promise.all([
      this.projectModel.countDocuments({ owner: userObjectId, status: 'Active' }),
      this.projectModel.countDocuments({ owner: userObjectId, status: 'Completed' }),
      this.projectModel.countDocuments({ owner: userObjectId, status: 'Inactive' }),
    ]);

    const [ todoCount, inProgressCount, doneCount ] = await Promise.all([
      this.taskModel.countDocuments({ userId: userObjectId, status: 'todo' }),
      this.taskModel.countDocuments({ userId: userObjectId, status: 'in-progress' }),
      this.taskModel.countDocuments({ userId: userObjectId, status: 'done' }),
    ]);

    return {
      projects: {
        active: activeCount,
        completed: completedCount,
        inactive: inactiveCount,
      },
      tasks: {
        todo: todoCount,
        'in-progress': inProgressCount,
        done: doneCount,
      },
    };
  }
}
