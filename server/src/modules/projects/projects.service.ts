import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from '../../schemas/project.schema';
import { CreateProjectDto } from '../../dtos/projects/create-project.dto';
import { UpdateProjectDto } from '../../dtos/projects/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(ownerId: string, dto: CreateProjectDto): Promise<Project> {
    const project = new this.projectModel({
      ...dto,
      owner: new Types.ObjectId(ownerId),
    });
    return project.save();
  }


  async findAllByOwner(ownerId: string): Promise<Project[]> {
  return this.projectModel
    .find({ owner: new Types.ObjectId(ownerId) })
    .exec();
}


  async findOneByOwner(ownerId: string, projectId: string): Promise<Project> {
    const project = await this.projectModel
      .findOne({ _id: projectId, owner: ownerId })
      .exec();
    if (!project) {
      throw new NotFoundException('Project not found or you do not have access');
    }
    return project;
  }

 
async update(
  ownerId: string,
  projectId: string,
  dto: UpdateProjectDto,
): Promise<Project> {
  if (!Types.ObjectId.isValid(projectId) || !Types.ObjectId.isValid(ownerId)) {
    throw new BadRequestException('Invalid project id or owner id');
  }

  const projectObjectId = new Types.ObjectId(projectId);
  const ownerObjectId = new Types.ObjectId(ownerId);

  const project = await this.projectModel.findOne({ 
    _id: projectObjectId, 
    owner: ownerObjectId 
  });
  if (!project) {
    throw new NotFoundException('Project not found or you do not have access');
  }

  // Assign allowed fields only
  const { title, description, status } = dto;
  if (title !== undefined) project.title = title;
  if (description !== undefined) project.description = description;
  if (status !== undefined) project.status = status;

  return project.save();
}

  async delete(ownerId: string, projectId: string): Promise<void> {
  if (!Types.ObjectId.isValid(projectId) || !Types.ObjectId.isValid(ownerId)) {
    throw new BadRequestException('Invalid project id or owner id');
  }

  const projectObjectId = new Types.ObjectId(projectId);
  const ownerObjectId = new Types.ObjectId(ownerId);

  const res = await this.projectModel.deleteOne({
    _id: projectObjectId,
    owner: ownerObjectId,
  }).exec();

  if (res.deletedCount === 0) {
    throw new NotFoundException('Project not found or you do not have access');
  }
}
}

