import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/modules/users/users.service';
import { ProjectsService } from 'src/modules/projects/projects.service';
import { TasksService } from 'src/modules/tasks/tasks.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const userService = appContext.get(UsersService);
  const projectService = appContext.get(ProjectsService);
  const taskService = appContext.get(TasksService);

  // create user
  const email = 'test@example.com';
  const plain = 'Test@123';
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(plain, salt);

  const user = await userService.create({ email, passwordHash });

  // create 2 projects
  const proj1 = await projectService.create(user._id as string, { title: 'Project One', description: 'First project' });
  const proj2 = await projectService.create(user._id as string, { title: 'Project Two', description: 'Second project' });

  // create tasks for proj1
  await taskService.create(proj1._id as string, user._id as string, { title: 'Task 1-A', description: 'First task of proj1', status: 'todo', dueDate: new Date().toISOString() });
  await taskService.create(proj1._id as string, user._id as string, { title: 'Task 1-B', description: 'Second task of proj1', status: 'in-progress', dueDate: new Date().toISOString() });
  await taskService.create(proj1._id as string, user._id as string, { title: 'Task 1-C', description: 'Third task of proj1', status: 'done', dueDate: new Date().toISOString() });

  // create tasks for proj2
  await taskService.create(proj2._id as string, user._id as string, { title: 'Task 2-A', description: 'First task of proj2', status: 'todo', dueDate: new Date().toISOString() });
  await taskService.create(proj2._id as string, user._id as string, { title: 'Task 2-B', description: 'Second task of proj2', status: 'in-progress', dueDate: new Date().toISOString() });
  await taskService.create(proj2._id as string, user._id as string, { title: 'Task 2-C', description: 'Third task of proj2', status: 'done', dueDate: new Date().toISOString() });

  console.log('Seeding complete');
  await appContext.close();
}

bootstrap().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});
