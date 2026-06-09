import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ProjectsRepository } from '../repositories/projects.repository';
import { GetProjectResponse } from '../dto/response/getProject.dto';
import { CreateProjectBody } from '../dto/input/createProject.dto';
import { UpdateProjectBody } from '../dto/input/updateProject.dto';
import { PROJECT_STATUSES } from '../constants/projects.constant';

@Injectable()
export class ProjectsService implements OnModuleInit {
  constructor(private readonly repository: ProjectsRepository) {}

  async onModuleInit(): Promise<void> {
    await this.ensureDefaultProjectStatuses();
  }

  async ensureDefaultProjectStatuses(): Promise<void> {
    await Promise.all(
      PROJECT_STATUSES.map((status) => {
        return this.repository.upsertStatus(status.code, status.label);
      }),
    );
  }

  async findAllProjects(): Promise<GetProjectResponse[]> {
    return this.repository.findAllProjects();
  }

  async findProjectByUuid(uuid: string): Promise<GetProjectResponse> {
    const response = await this.repository.findProjectByUuid(uuid);
    if (!response) {
      throw new NotFoundException('Project not found', 'PROJECT_NOT_FOUND');
    }
    return response;
  }

  async createProject(data: CreateProjectBody): Promise<GetProjectResponse> {
    const response = await this.repository.createProject(data);
    if (!response) {
      throw new NotFoundException(
        'Project status not found',
        'STATUS_NOT_FOUND',
      );
    }
    return response;
  }

  async updateProject(
    uuid: string,
    data: UpdateProjectBody,
  ): Promise<GetProjectResponse> {
    const response = await this.repository.updateProject(uuid, data);
    if (!response) {
      throw new NotFoundException(
        "Project with this UUID or status doesn't exist",
        'PROJECT_NOT_FOUND',
      );
    }
    return response;
  }

  async deleteProject(uuid: string): Promise<void> {
    if (!(await this.repository.deleteProject(uuid))) {
      throw new NotFoundException(
        "Project with this UUID doesn't exist",
        'PROJECT_NOT_FOUND',
      );
    }
  }
}
