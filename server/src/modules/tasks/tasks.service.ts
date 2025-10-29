import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from '../../schemas/task.schema';
import { CreateTaskDto } from '../../dtos/tasks/create-task.dto';
import { UpdateTaskDto } from '../../dtos/tasks/update-task.dto';
import { Project, ProjectDocument } from '../../schemas/project.schema';
import { User } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private jwtService: JwtService,
  ) {}

  async create(projectId: string, userId: string, dto: CreateTaskDto): Promise<Task> {
    const created = new this.taskModel({ ...dto, project: new Types.ObjectId(projectId), userId: new Types.ObjectId(userId) });
    return created.save();
  }



  async findTaskByUser(userId: string): Promise<Task[]> {
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestException('Invalid user id');
  }

  const tasks = await this.taskModel
    .find({ userId: new Types.ObjectId(userId) })
    .populate('project')
    .exec();

  if (!tasks || tasks.length === 0) {
    throw new NotFoundException('No tasks found for this user');
  }

  return tasks;
}



  async update(taskId: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: taskId}).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    Object.assign(task, dto);
    return task.save();
  }

  async delete(taskId: string): Promise<void> {
    const result = await this.taskModel.deleteOne({ _id: taskId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Task not found');
    }
  }

}
