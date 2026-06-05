import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectBody } from '../dto/input/createProject.dto';
import { UpdateProjectBody } from '../dto/input/updateProject.dto';
import { GetProjectResponse } from '../dto/response/getProject.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateProjectResponse } from '../dto/response/updateProject.dto';
import { CreateProjectResponse } from '../dto/response/createProject.dto';
import { ProjectsService } from '../services/project.service';
import { CheckMaintenance } from '../../status/decorators/checkMaintenance.decorator';
import { AuthPermissions } from '../../auth/decorators/auth-permissions.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @CheckMaintenance()
  @Get() // tbd: responses, service function
  @ApiOperation({
    summary: 'Retrieve a list of all projects',
    description:
      'Fetches and returns an array of all project entities stored in the system.',
  })
  @ApiOkResponse({
    isArray: true,
    type: GetProjectResponse,
    description: 'List of all projects retrieved successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getProjects(): Promise<GetProjectResponse[]> {
    return this.projectService.findAllProjects();
  }

  @CheckMaintenance()
  @Get(':uuid') // tbd: responses, service function
  @ApiOperation({
    summary: 'Retrieve a project',
    description:
      'Fetches and returns a single project entity based on the provided ID.',
  })
  @ApiOkResponse({
    type: GetProjectResponse,
    description: 'Project retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'Project with the specified ID not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getProjectById(
    @Param('uuid') uuid: string,
  ): Promise<GetProjectResponse> {
    return await this.projectService.findProjectByUuid(uuid);
  }

  @CheckMaintenance()
  @Post() // tbd: responses, service function
  @AuthPermissions('projects:create')
  @ApiOperation({
    summary: 'Create a new project',
    description:
      'Creates a new project entity with the provided data. Requires permission: projects:create',
  })
  @ApiCreatedResponse({
    type: GetProjectResponse,
    description: 'Project created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, insufficient permissions',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  createProject(@Body() body: CreateProjectBody): CreateProjectResponse {
    void body;
    throw new NotImplementedException();
  }

  @CheckMaintenance()
  @Patch(':uuid') // tbd: responses, service function
  @AuthPermissions('projects:update')
  @ApiOperation({
    summary: 'Update an existing project',
    description:
      'Updates the project entity identified by the provided ID with new data.  Requires permission: projects:update',
  })
  @ApiOkResponse({
    type: UpdateProjectResponse,
    description: 'Project updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Project with the specified ID not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, insufficient permissions',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  updateProject(
    @Param('uuid') uuid: string,
    @Body() body: UpdateProjectBody,
  ): UpdateProjectResponse {
    void uuid;
    void body;
    throw new NotImplementedException();
  }

  @CheckMaintenance()
  @Delete(':uuid') // tbd: responses, service function
  @AuthPermissions('projects:delete')
  @ApiOperation({
    summary: 'Delete a project',
    description:
      'Deletes the project entity identified by the provided ID. Requires permission: projects:delete',
  })
  @ApiOkResponse({
    // type:
    description: 'Project deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Project with the specified ID not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, insufficient permissions',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  deleteProject(@Param('uuid') uuid: string) {
    void uuid;
    throw new NotImplementedException();
  }
}
