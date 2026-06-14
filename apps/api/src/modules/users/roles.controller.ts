import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthPermissions } from '../auth/decorators/auth-permissions.decorator';
import {
  CreateRoleBody,
  DeleteRoleBody,
  RoleResponse,
  UpdateRoleBody,
} from './dto/input/role.dto';
import { UsersService } from './services/users.service';

@Controller('roles')
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @AuthPermissions('roles:read')
  @ApiOkResponse({ type: RoleResponse, isArray: true })
  getRoles() {
    return this.usersService.getRoles();
  }

  @Get('permissions')
  @AuthPermissions('roles:read')
  getPermissions() {
    return this.usersService.getPermissions();
  }

  @Post()
  @AuthPermissions('roles:create')
  @ApiOkResponse({ type: RoleResponse })
  createRole(@Body() body: CreateRoleBody) {
    return this.usersService.createRole(body);
  }

  @Patch(':code')
  @AuthPermissions('roles:update')
  @ApiOkResponse({ type: RoleResponse })
  updateRole(@Param('code') code: string, @Body() body: UpdateRoleBody) {
    return this.usersService.updateRole(code, body);
  }

  @Delete(':code')
  @AuthPermissions('roles:delete')
  async deleteRole(@Param('code') code: string, @Body() body: DeleteRoleBody) {
    await this.usersService.deleteRole(code, body.replacementRoleCode);
    return { deleted: true };
  }
}
