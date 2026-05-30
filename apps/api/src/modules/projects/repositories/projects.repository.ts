import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { GetProjectResponse } from '../dto/response/getProject.dto';
import { CreateProjectBody } from '../dto/input/createProject.dto';
import { CreateProjectResponse } from '../dto/response/createProject.dto';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
  ) {}

  private formatProjectResponse(project: ProjectEntity): GetProjectResponse {
    return {
      uuid: project.uuid,
      status: {
        code: project.status.code,
        label: project.status.label,
        icon: project.status.icon,
        color: {
          code: project.status.color.code,
          label: project.status.color.label,
        },
      },
      title: project.title,
      shortDescription: project.shortDescription,
      detailedDescription: project.detailedDescription,
      imageUrl: project.image,
      tags: project.tags
        ? JSON.parse(project.tags).map((tag) => ({
            name: tag.name,
            icon: tag.icon,
          }))
        : [],
      sourceCodeOpen: project.sourceCodeOpen,
      sourceCodeUrl: project.sourceCodeUrl,
      developers: project.developers
        ? JSON.parse(project.developers).map((dev) => ({
            name: dev.name,
            role: dev.role,
            profileUrl: dev.profileUrl,
          }))
        : [],
      startDate: project.startDate
        ? project.startDate.toISOString().split('T')[0]
        : undefined,
      completeDate: project.completeDate
        ? project.completeDate.toISOString().split('T')[0]
        : undefined,
    };
  }

  async checkIfProjectExistsByUuid(uuid: string): Promise<boolean> {
    const result = await this.projectRepo.find({
      where: { uuid },
    });

    return result.length > 0;
  }

  async findAllProjects(): Promise<GetProjectResponse[]> {
    const result = await this.projectRepo.find();

    return result.map((project) => this.formatProjectResponse(project));
  }

  async findProjectByUuid(uuid: string): Promise<GetProjectResponse | null> {
    const result = await this.projectRepo.findOne({
      where: { uuid },
    });

    if (!result) return null;

    return this.formatProjectResponse(result);
  }

  // Create a new project

  // Update an existing project by UUID

  // Delete a project by UUID
}
