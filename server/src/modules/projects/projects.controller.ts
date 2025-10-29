import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from '../../dtos/projects/create-project.dto';
import { UpdateProjectDto } from '../../dtos/projects/update-project.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guards';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(req.user.userId, dto);
  } 

  @Get()
  async findAll(@Req() req) {
    console.log('Fetching projects for user:', req.user.userId);
    return this.projectsService.findAllByOwner(req.user.userId);
  }



  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    return this.projectsService.findOneByOwner(req.user.userId, id);
  }

  @Put(':id')
  async update(@Req() req, @Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    console.log('Deleting project with ID:', id, 'for user:', req.user.userId);
    await this.projectsService.delete(req.user.userId, id);
    return { message: 'Project deleted successfully' };
  }
}
