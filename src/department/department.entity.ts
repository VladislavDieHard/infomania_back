import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('departments')
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  title: string;

  @Column({length: 400, nullable: false})
  description: string;

  @OneToMany(() => User, User => User.department)
  users: User[];
}