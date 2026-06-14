import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UsersService } from './services/users.service';
import { UserResponse } from './dto/response/user.dto';
import { UpdateUserRoleBody } from './dto/input/updateUserRole.dto';
import { AuthPermissions } from '../auth/decorators/auth-permissions.decorator';
import { UpdateUserStatusBody } from './dto/input/updateUserStatus.dto';
import { BlockUserBody } from './dto/input/blockUser.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @AuthPermissions('users:read')
  @ApiOperation({
    summary: 'List users',
    description: 'Returns all user accounts. Requires permission: users:read',
  })
  @ApiOkResponse({ type: UserResponse, isArray: true })
  async getUsers(): Promise<UserResponse[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':uuid')
  @AuthPermissions('users:read')
  @ApiOperation({
    summary: 'Get user',
    description: 'Returns a user by UUID. Requires permission: users:read',
  })
  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUser(@Param('uuid') uuid: string): Promise<UserResponse> {
    return UserResponse.fromEntity(
      await this.usersService.findUserByUuid(uuid),
    );
  }

  @Patch(':uuid/role')
  @AuthPermissions('users.roles:update')
  @ApiOperation({
    summary: 'Update user role',
    description:
      'Replaces the user role. A user can have only one role. Requires permission: users.roles:update',
  })
  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse({ description: 'User or role not found' })
  async updateUserRole(
    @Param('uuid') uuid: string,
    @Body() body: UpdateUserRoleBody,
  ): Promise<UserResponse> {
    return this.usersService.updateUserRole(uuid, body.roleCode);
  }

  @Patch(':uuid/status')
  @AuthPermissions('users.status:update')
  @ApiOkResponse({ type: UserResponse })
  async updateUserStatus(
    @Param('uuid') uuid: string,
    @Body() body: UpdateUserStatusBody,
  ) {
    return this.usersService.updateUserStatus(uuid, body.isActive);
  }

  @Patch(':uuid/block')
  @AuthPermissions('users.status:update')
  @ApiOkResponse({ type: UserResponse })
  async blockUser(
    @Param('uuid') uuid: string,
    @Body() body: BlockUserBody,
  ): Promise<UserResponse> {
    return this.usersService.blockUser(uuid, body.blockedUntil, body.reason);
  }

  @Delete(':uuid/block')
  @AuthPermissions('users.status:update')
  @ApiOkResponse({ type: UserResponse })
  async unblockUser(@Param('uuid') uuid: string): Promise<UserResponse> {
    return this.usersService.unblockUser(uuid);
  }

  @Delete(':uuid')
  @AuthPermissions('users:delete')
  async deleteUser(@Param('uuid') uuid: string) {
    await this.usersService.deleteUser(uuid);
    return { deleted: true };
  }
}
