import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('glucose_history')
export class GlucoseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'varchar', length: 10 })
  unit: string;

  @Column({ type: 'varchar', length: 25 })
  provider: string;

  @Column({ type: 'timestamptz', unique: true, name: 'timestamp' })
  timestamp: Date;
}
