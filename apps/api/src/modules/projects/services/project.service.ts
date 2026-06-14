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
    await this.repository.migrateLegacyProjects();
  }

  async ensureDefaultProjectStatuses(): Promise<void> {
    await Promise.all(
      PROJECT_STATUSES.map((status) => {
        return this.repository.upsertStatus(status.code, status.label);
      }),
    );
  }

  async findAllProjects(language = 'pl'): Promise<GetProjectResponse[]> {
    return this.repository.findAllProjects(language);
  }

  async findProjectByUuid(
    uuid: string,
    language = 'pl',
  ): Promise<GetProjectResponse> {
    const response = await this.repository.findProjectByUuid(uuid, language);
    if (!response) {
      throw new NotFoundException('Project not found', 'PROJECT_NOT_FOUND');
    }
    return response;
  }

  findAllAdminProjects() {
    return this.repository.findAllAdminProjects();
  }

  async findAdminProjectByUuid(uuid: string) {
    const response = await this.repository.findAdminProjectByUuid(uuid);
    if (!response) throw new NotFoundException('Project not found');
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

  async setPublished(uuid: string, isPublished: boolean) {
    const response = await this.repository.setPublished(uuid, isPublished);
    if (!response) throw new NotFoundException('Project not found');
    return response;
  }
}
