import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../entities/user.entity';

export class UserRoleResponse {
  @ApiProperty({ example: 'ADMIN' })
  code: string;

  @ApiProperty({ example: 'Administrator' })
  label: string;

  @ApiProperty({ example: ['projects:create', 'projects:update'] })
  permissions: string[];
}

export class UserResponse {
  @ApiProperty({ example: 'e2718142-3c3f-4a5f-9038-f53ea9f15b47' })
  uuid: string;

  @ApiProperty({ example: 'admin@example.com' })
  email: string;

  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ type: UserRoleResponse })
  role: UserRoleResponse;

  static fromEntity(user: UserEntity): UserResponse {
    return {
      uuid: user.uuid,
      email: user.email,
      username: user.username,
      isActive: user.isActive,
      role: {
        code: user.role.code,
        label: user.role.label,
        permissions:
          user.role.permissions?.map((permission) => permission.code) ?? [],
      },
    };
  }
}
