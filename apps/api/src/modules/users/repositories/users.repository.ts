import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  countUsers(): Promise<number> {
    return this.userRepo.count();
  }

  findAllUsers(): Promise<UserEntity[]> {
    return this.userRepo.find();
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
      return this.roleRepo.save(existingRole);
    }

    return this.roleRepo.save(
      this.roleRepo.create({
        code,
        label,
        permissions,
      }),
    );
  }

  createUser(data: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepo.save(this.userRepo.create(data));
  }

  saveUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepo.save(user);
  }
}
