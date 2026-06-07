import {
  ConflictException,
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
        this.repository.upsertRole(
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

    user.role = role;
    return UserResponse.fromEntity(await this.repository.saveUser(user));
  }
}
