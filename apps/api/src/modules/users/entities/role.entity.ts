import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  label: string;

  @Column({ type: 'boolean', default: false, name: 'is_system' })
  isSystem: boolean;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'roles_permissions_link',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionEntity[];

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
