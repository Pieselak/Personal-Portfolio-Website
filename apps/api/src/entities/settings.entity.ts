import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('settings')
export class SettingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  label?: string;

  @Column({ type: 'jsonb' })
  value: Record<string, any>;
}
