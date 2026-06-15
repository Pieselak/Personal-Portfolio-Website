import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProjectBody } from '../dto/input/createProject.dto';
import { UpdateProjectBody } from '../dto/input/updateProject.dto';
import { GetProjectResponse } from '../dto/response/getProject.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateProjectResponse } from '../dto/response/updateProject.dto';
import { CreateProjectResponse } from '../dto/response/createProject.dto';
import { ProjectsService } from '../services/project.service';
import { CheckMaintenance } from '../../status/decorators/checkMaintenance.decorator';
import { AuthPermissions } from '../../auth/decorators/auth-permissions.decorator';
import { DeleteProjectResponse } from '../dto/response/deleteProject.dto';

const projectUuidPipe = new ParseUUIDPipe({
  version: '4',
  exceptionFactory: () => new BadRequestException('Invalid request.'),
});

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @CheckMaintenance()
  @Get()
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
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['pl', 'en', 'de'],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getProjects(
    @Query('lang') language = 'pl',
  ): Promise<GetProjectResponse[]> {
    return this.projectService.findAllProjects(language);
  }

  @CheckMaintenance()
  @Get(':uuid')
  @ApiOperation({
    summary: 'Retrieve a project',
    description:
      'Fetches and returns a single project entity based on the provided ID.',
  })
  @ApiOkResponse({
    type: GetProjectResponse,
    description: 'Project retrieved successfully',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['pl', 'en', 'de'],
  })
  @ApiNotFoundResponse({
    description: 'Project with the specified ID not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid project UUID',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getProjectById(
    @Param('uuid', projectUuidPipe) uuid: string,
    @Query('lang') language = 'pl',
  ): Promise<GetProjectResponse> {
    return this.projectService.findProjectByUuid(uuid, language);
  }

  @CheckMaintenance()
  @Post()
  @AuthPermissions('projects:create')
  @ApiOperation({
    summary: 'Create a new project',
    description:
      'Creates a new project entity with the provided data. Requires permission: projects:create',
  })
  @ApiCreatedResponse({
    type: CreateProjectResponse,
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
  async createProject(
    @Body() body: CreateProjectBody,
  ): Promise<CreateProjectResponse> {
    return this.projectService.createProject(body);
  }

  @CheckMaintenance()
  @Patch(':uuid')
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
  @ApiBadRequestResponse({
    description: 'Invalid project UUID',
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
  async updateProject(
    @Param('uuid', projectUuidPipe) uuid: string,
    @Body() body: UpdateProjectBody,
  ): Promise<UpdateProjectResponse> {
    return this.projectService.updateProject(uuid, body);
  }

  @CheckMaintenance()
  @Delete(':uuid')
  @AuthPermissions('projects:delete')
  @ApiOperation({
    summary: 'Delete a project',
    description:
      'Deletes the project entity identified by the provided ID. Requires permission: projects:delete',
  })
  @ApiOkResponse({
    type: DeleteProjectResponse,
    description: 'Project deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Project with the specified ID not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid project UUID',
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
  async deleteProject(
    @Param('uuid', projectUuidPipe) uuid: string,
  ): Promise<DeleteProjectResponse> {
    await this.projectService.deleteProject(uuid);
    return { deleted: true };
  }
}
