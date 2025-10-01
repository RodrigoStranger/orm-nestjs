import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('universities')
export class UniversityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, nullable: false })
  name: string;
}