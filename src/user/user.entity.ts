import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleType } from './user-role.type';
import { Department } from '../department/department.entity';
import { Exclude } from 'class-transformer';
import { Entry } from '../entry/entry.entity';
import { Menu } from '../menu/entities/menu.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  username: string;

  @Column({nullable: false})
  @Exclude()
  password: string;

  @Column({type: 'boolean', default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: UserRoleType,
    default: UserRoleType.Moderator
  })
  role: UserRoleType;

  @ManyToOne(() => Department, department => department.users)
  department: Department;

  // @RelationId((user: User) => user.department)
  // departmentId: number;

  @OneToMany(() => Entry, entry => entry.author)
  entries: Entry[];

  @ManyToOne(() => Menu, menu => menu.author)
  menus: Menu[];
}