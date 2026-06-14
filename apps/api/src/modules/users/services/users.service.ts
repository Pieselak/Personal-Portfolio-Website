import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../repositories/users.repository';
import { UserEntity } from '../entities/user.entity';
import { UserResponse } from '../dto/response/user.dto';
import {
  DEFAULT_ROLE_CODE,
  PERMISSIONS,
  ROLES,
} from '../constants/permissions.constant';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly repository: UsersRepository) {}

  async onModuleInit(): Promise<void> {
    await this.ensureDefaultAuthorizationModel();
  }

  async ensureDefaultAuthorizationModel(): Promise<void> {
    const permissions = await Promise.all(
      PERMISSIONS.map((permission) =>
        this.repository.upsertPermission(permission),
      ),
    );

    await Promise.all(
      ROLES.map((role) => {
        return this.repository.upsertRole(
          role.code,
          role.label,
          permissions.filter((p) => role.permissions.includes(p.code)),
        );
      }),
    );
  }

  async findAllUsers(): Promise<UserResponse[]> {
    const users = await this.repository.findAllUsers();
    return users.map((user) => UserResponse.fromEntity(user));
  }

  async findUserByUuid(uuid: string): Promise<UserEntity> {
    const user = await this.repository.findUserByUuid(uuid);

    if (!user) {
      throw new NotFoundException('User not found', 'USER_NOT_FOUND');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findUserByEmail(email.toLowerCase());
  }

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return this.repository.findUserByUsername(username);
  }

  async createUser(data: {
    email: string;
    username: string;
    password: string;
  }): Promise<UserEntity> {
    await this.ensureDefaultAuthorizationModel();

    const normalizedEmail = data.email.toLowerCase();

    if (await this.repository.findUserByEmail(normalizedEmail)) {
      throw new ConflictException(
        'Email is already used',
        'EMAIL_ALREADY_USED',
      );
    }

    if (await this.repository.findUserByUsername(data.username)) {
      throw new ConflictException(
        'Username is already used',
        'USERNAME_ALREADY_USED',
      );
    }

    const role = await this.repository.findRoleByCode(DEFAULT_ROLE_CODE);

    if (!role) {
      throw new NotFoundException('Default role not found', 'ROLE_NOT_FOUND');
    }

    return this.repository.createUser({
      uuid: randomUUID(),
      email: normalizedEmail,
      username: data.username,
      passwordHash: await bcrypt.hash(data.password, 12),
      role,
    });
  }

  async updateUserRole(uuid: string, roleCode: string): Promise<UserResponse> {
    const user = await this.findUserByUuid(uuid);
    const role = await this.repository.findRoleByCode(roleCode);

    if (!role) {
      throw new NotFoundException('Role not found', 'ROLE_NOT_FOUND');
    }

    if (
      user.role.code === 'ADMIN' &&
      role.code !== 'ADMIN' &&
      this.isUserAccessAllowed(user) &&
      (await this.repository.countAvailableUsersByRole('ADMIN')) <= 1
    ) {
      throw new ForbiddenException(
        'The last active administrator cannot lose the ADMIN role',
      );
    }

    user.role = role;
    return UserResponse.fromEntity(await this.repository.saveUser(user));
  }

  async updateUserStatus(
    uuid: string,
    isActive: boolean,
  ): Promise<UserResponse> {
    const user = await this.findUserByUuid(uuid);
    if (
      user.role.code === 'ADMIN' &&
      !isActive &&
      this.isUserAccessAllowed(user) &&
      (await this.repository.countAvailableUsersByRole('ADMIN')) <= 1
    ) {
      throw new ForbiddenException(
        'The last active administrator cannot be deactivated',
      );
    }
    user.isActive = isActive;
    return UserResponse.fromEntity(await this.repository.saveUser(user));
  }

  async blockUser(
    uuid: string,
    blockedUntilValue: string,
    reasonValue: string,
  ): Promise<UserResponse> {
    const user = await this.findUserByUuid(uuid);
    const blockedUntil = new Date(blockedUntilValue);
    if (blockedUntil.getTime() <= Date.now()) {
      throw new BadRequestException('Block expiration must be in the future');
    }
    if (
      user.role.code === 'ADMIN' &&
      this.isUserAccessAllowed(user) &&
      (await this.repository.countAvailableUsersByRole('ADMIN')) <= 1
    ) {
      throw new ForbiddenException(
        'The last active administrator cannot be blocked',
      );
    }
    user.blockedUntil = blockedUntil;
    user.blockedReason = reasonValue.trim();
    return UserResponse.fromEntity(await this.repository.saveUser(user));
  }

  async unblockUser(uuid: string): Promise<UserResponse> {
    const user = await this.findUserByUuid(uuid);
    user.blockedUntil = null;
    user.blockedReason = null;
    return UserResponse.fromEntity(await this.repository.saveUser(user));
  }

  async deleteUser(uuid: string): Promise<void> {
    const user = await this.findUserByUuid(uuid);
    if (
      user.role.code === 'ADMIN' &&
      this.isUserAccessAllowed(user) &&
      (await this.repository.countAvailableUsersByRole('ADMIN')) <= 1
    ) {
      throw new ForbiddenException(
        'The last active administrator cannot be deleted',
      );
    }
    await this.repository.removeUser(user);
  }

  isUserAccessAllowed(user: UserEntity): boolean {
    return (
      user.isActive &&
      (!user.blockedUntil || user.blockedUntil.getTime() <= Date.now())
    );
  }

  async getRoles() {
    return (await this.repository.findAllRoles()).map((role) => ({
      code: role.code,
      label: role.label,
      isSystem: role.isSystem,
      permissions: role.permissions.map((permission) => permission.code),
    }));
  }

  async getPermissions() {
    return (await this.repository.findAllPermissions()).map(
      (permission) => permission.code,
    );
  }

  async createRole(data: {
    code: string;
    label: string;
    permissions: string[];
  }) {
    const code = data.code.trim().toUpperCase();
    if (await this.repository.findRoleByCode(code)) {
      throw new ConflictException('Role code already exists');
    }
    const permissions = await this.repository.findPermissionsByCodes(
      data.permissions,
    );
    if (permissions.length !== new Set(data.permissions).size) {
      throw new BadRequestException('Unknown permission code');
    }
    const role = await this.repository.saveRole(
      this.repository.createRole({
        code,
        label: data.label.trim(),
        isSystem: false,
        permissions,
      }),
    );
    return {
      code: role.code,
      label: role.label,
      isSystem: role.isSystem,
      permissions: role.permissions.map((permission) => permission.code),
    };
  }

  async updateRole(
    code: string,
    data: { label?: string; permissions?: string[] },
  ) {
    const role = await this.repository.findRoleByCode(code);
    if (!role) throw new NotFoundException('Role not found');
    if (role.code === 'ADMIN' && data.permissions) {
      throw new ForbiddenException('ADMIN permissions are managed by system');
    }
    if (data.label) role.label = data.label.trim();
    if (data.permissions) {
      const permissions = await this.repository.findPermissionsByCodes(
        data.permissions,
      );
      if (permissions.length !== new Set(data.permissions).size) {
        throw new BadRequestException('Unknown permission code');
      }
      role.permissions = permissions;
    }
    const saved = await this.repository.saveRole(role);
    return {
      code: saved.code,
      label: saved.label,
      isSystem: saved.isSystem,
      permissions: saved.permissions.map((permission) => permission.code),
    };
  }

  async deleteRole(code: string, replacementCode: string): Promise<void> {
    const role = await this.repository.findRoleByCode(code);
    if (!role) throw new NotFoundException('Role not found');
    if (role.isSystem) {
      throw new ForbiddenException('System roles cannot be deleted');
    }
    const replacement = await this.repository.findRoleByCode(replacementCode);
    if (!replacement || replacement.code === role.code) {
      throw new BadRequestException('Valid replacement role is required');
    }
    await this.repository.replaceRoleAndDelete(role, replacement);
  }
}
