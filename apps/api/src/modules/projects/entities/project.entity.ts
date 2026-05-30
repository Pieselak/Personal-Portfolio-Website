import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectTagEntity } from './projectTag.entity';
import { ProjectStatusEntity } from './projectStatus.entity';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @ManyToOne(() => ProjectStatusEntity, { cascade: true, eager: true })
  @JoinColumn({ name: 'status_id' })
  status: ProjectStatusEntity;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', name: 'short_description' })
  shortDescription: string;

  @Column({ type: 'text', name: 'detailed_description' })
  detailedDescription: string;

  @Column({ type: 'jsonb', nullable: true })
  tags: string;

  @Column({ type: 'jsonb', nullable: true })
  developers: string;

  @Column({ type: 'boolean', default: false, name: 'source_code_open' })
  sourceCodeOpen: boolean;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    name: 'source_code_url',
  })
  sourceCodeUrl: string;

  @Column({ type: 'date', nullable: true, name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true, name: 'complete_date' })
  completeDate: Date;

  @ManyToMany(() => ProjectTagEntity, { cascade: true, eager: true })
  @JoinTable({
    name: 'projects_tags_link',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  projectTags: ProjectTagEntity[];
}
