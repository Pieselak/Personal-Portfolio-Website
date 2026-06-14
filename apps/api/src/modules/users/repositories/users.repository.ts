import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, IsNull, LessThanOrEqual, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';
import { PermissionEntity } from '../entities/permission.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
    private readonly dataSource: DataSource,
  ) {}

  countUsers(): Promise<number> {
    return this.userRepo.count();
  }

  findAllUsers(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  countAvailableUsersByRole(code: string): Promise<number> {
    return this.userRepo.count({
      where: [
        { isActive: true, blockedUntil: IsNull(), role: { code } },
        {
          isActive: true,
          blockedUntil: LessThanOrEqual(new Date()),
          role: { code },
        },
      ],
    });
  }

  findUserByUuid(uuid: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { uuid } });
  }

  findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  findUserByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  findRoleByCode(code: string): Promise<RoleEntity | null> {
    return this.roleRepo.findOne({ where: { code } });
  }

  findAllRoles(): Promise<RoleEntity[]> {
    return this.roleRepo.find({ order: { isSystem: 'DESC', label: 'ASC' } });
  }

  findAllPermissions(): Promise<PermissionEntity[]> {
    return this.permissionRepo.find({ order: { code: 'ASC' } });
  }

  findPermissionsByCodes(codes: string[]): Promise<PermissionEntity[]> {
    if (!codes.length) return Promise.resolve([]);
    return this.permissionRepo.find({ where: { code: In(codes) } });
  }

  async upsertPermission(code: string): Promise<PermissionEntity> {
    await this.permissionRepo.upsert(
      {
        code,
        label: code,
      },
      ['code'],
    );

    return this.permissionRepo.findOneOrFail({ where: { code } });
  }

  async upsertRole(
    code: string,
    label: string,
    permissions: PermissionEntity[],
  ): Promise<RoleEntity> {
    const existingRole = await this.roleRepo.findOne({ where: { code } });

    if (existingRole) {
      existingRole.label = label;
      existingRole.permissions = permissions;
      existingRole.isSystem = true;
      return this.roleRepo.save(existingRole);
    }

    return this.roleRepo.save(
      this.roleRepo.create({
        code,
        label,
        isSystem: true,
        permissions,
      }),
    );
  }

  saveRole(role: RoleEntity): Promise<RoleEntity> {
    return this.roleRepo.save(role);
  }

  createRole(data: Partial<RoleEntity>): RoleEntity {
    return this.roleRepo.create(data);
  }

  async replaceRoleAndDelete(
    role: RoleEntity,
    replacement: RoleEntity,
  ): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await manager.update(
        UserEntity,
        { role: { id: role.id } },
        { role: replacement },
      );
      await manager.remove(RoleEntity, role);
    });
  }

  createUser(data: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepo.save(this.userRepo.create(data));
  }

  saveUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepo.save(user);
  }

  async removeUser(user: UserEntity): Promise<void> {
    await this.userRepo.remove(user);
  }
}
