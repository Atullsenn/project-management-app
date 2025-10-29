import { IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['active', 'completed', 'inactive'])
  status?: 'active' | 'completed' | 'inactive';
}
