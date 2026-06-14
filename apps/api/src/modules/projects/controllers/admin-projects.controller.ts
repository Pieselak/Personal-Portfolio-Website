import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthPermissions } from '../../auth/decorators/auth-permissions.decorator';
import { CreateProjectBody } from '../dto/input/createProject.dto';
import { UpdateProjectBody } from '../dto/input/updateProject.dto';
import { ProjectsService } from '../services/project.service';

@Controller('admin/projects')
@ApiTags('Admin Projects')
export class AdminProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  @AuthPermissions('projects:read')
  findAll() {
    return this.service.findAllAdminProjects();
  }

  @Get(':uuid')
  @AuthPermissions('projects:read')
  findOne(@Param('uuid') uuid: string) {
    return this.service.findAdminProjectByUuid(uuid);
  }

  @Post()
  @AuthPermissions('projects:create')
  create(@Body() body: CreateProjectBody) {
    return this.service.createProject(body);
  }

  @Patch(':uuid')
  @AuthPermissions('projects:update')
  update(@Param('uuid') uuid: string, @Body() body: UpdateProjectBody) {
    return this.service.updateProject(uuid, body);
  }

  @Post(':uuid/publish')
  @AuthPermissions('projects:publish')
  publish(@Param('uuid') uuid: string) {
    return this.service.setPublished(uuid, true);
  }

  @Post(':uuid/unpublish')
  @AuthPermissions('projects:publish')
  unpublish(@Param('uuid') uuid: string) {
    return this.service.setPublished(uuid, false);
  }

  @Delete(':uuid')
  @AuthPermissions('projects:delete')
  async remove(@Param('uuid') uuid: string) {
    await this.service.deleteProject(uuid);
    return { deleted: true };
  }
}
