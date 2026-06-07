import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects_statuses_colors')
export class ProjectStatusColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 7 })
  color: string;
}
