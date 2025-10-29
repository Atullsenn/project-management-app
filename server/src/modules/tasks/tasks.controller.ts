import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../../dtos/tasks/create-task.dto';
import { UpdateTaskDto } from '../../dtos/tasks/update-task.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guards';
import { Task } from '../../schemas/task.schema';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/:projectId')
  async create(
    @Param('projectId') projectId: string,
    @Body() dto: CreateTaskDto,
    @Req() req,
  ) {
    return this.tasksService.create(projectId, req.user.userId, dto);
  }

  @Get()
  async getTasksByUser(@Req() req): Promise<Task[]> {
    const userId = req.user?.userId;
    console.log(userId, "check userId")
    if (!userId) {
      throw new BadRequestException('User not authenticated');
    }
    return this.tasksService.findTaskByUser(userId);
  }

  @Put(':taskId')
  async update(
    // @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(taskId, dto);
  }

  @Delete(':taskId')
  async delete(
    // @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.delete(taskId);
  }
}
