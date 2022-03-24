import { BaseEntity, Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Entry } from '../entry/entry.entity';
import { MenuItem } from '../menu/entities/menu_item.entity';

@Entity('departments')
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  title: string;

  @Column({length: 400, nullable: false})
  description: string;

  @Column()
  preview: string;

  @OneToMany(() => User, user => user.department)
  users: User[];

  @ManyToMany(() => Entry, entry => entry.departments)
  entries: Entry[];

  @OneToOne(() => MenuItem, menuItem => menuItem.department)
  menu_item: MenuItem;
}