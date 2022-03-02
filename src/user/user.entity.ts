import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleType } from './user-role.type';
import { Department } from '../department/department.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  username: string;

  @Column({nullable: false})
  password: string;

  @Column({type: 'boolean', default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: UserRoleType,
    default: UserRoleType.Moderator
  })
  role: UserRoleType

  @ManyToOne(
    () => Department, department => department.id,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' }
    )
  @JoinColumn({name: 'department_title', referencedColumnName: 'title'})
  department: Department
}