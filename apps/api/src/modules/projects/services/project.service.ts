import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from '../repositories/projects.repository';
import { GetProjectResponse } from '../dto/response/getProject.dto';
import { NotImplementedException } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository) {}

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

  async createProject(data: any): Promise<GetProjectResponse> {
    throw new NotImplementedException();
  }

  async updateProject(uuid: string, data: any): Promise<GetProjectResponse> {
    if (!(await this.repository.checkIfProjectExistsByUuid(uuid))) {
      throw new NotFoundException(
        "Project with this UUID doesn't exist",
        'PROJECT_NOT_FOUND',
      );
    }
    throw new NotImplementedException();
  }

  async deleteProject(uuid: string): Promise<void> {
    if (!(await this.repository.checkIfProjectExistsByUuid(uuid))) {
      throw new NotFoundException(
        "Project with this UUID doesn't exist",
        'PROJECT_NOT_FOUND',
      );
    }
    throw new NotImplementedException();
  }
}
