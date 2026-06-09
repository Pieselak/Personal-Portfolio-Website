import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects_statuses')
export class ProjectStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  label: string;
}
