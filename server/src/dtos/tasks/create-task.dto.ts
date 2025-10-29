import { IsNotEmpty, IsString, IsEnum, IsDateString } from 'class-validator';

export class CreateTaskDto {
  userId?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(['todo', 'in-progress', 'done'])
  status: 'todo' | 'in-progress' | 'done';

  @IsDateString()
  dueDate: string;
}
