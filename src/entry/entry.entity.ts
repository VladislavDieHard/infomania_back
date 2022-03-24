import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../department/department.entity';
import { Exclude } from 'class-transformer';
import { User } from '../user/user.entity';
import { Rubric } from '../rubric/rubric.entity';
import { MenuItem } from '../menu/entities/menu_item.entity';

@Entity()
export class Entry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column({ nullable: false })
  @Exclude()
  text: string;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  date_of_create: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  date_of_edit: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  publish_time: Date;

  @Column({ unique: true, nullable: false })
  slug: string;

  @Column()
  preview: string;

  @ManyToMany(() => Department, department => department.entries)
  departments: Department[];

  @ManyToOne(() => User, user => user.entries)
  author: User;

  @ManyToMany(() => Rubric, rubric => rubric.entries)
  rubrics: Rubric[];

  @OneToOne(() => MenuItem, menuItem => menuItem.entry)
  menu_item: MenuItem;
}