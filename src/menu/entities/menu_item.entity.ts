import { Menu } from './menu.entity';
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MenuItemEnum } from './menu_item.types';
import { Entry } from '../../entry/entry.entity';
import { Rubric } from '../../rubric/rubric.entity';
import { Department } from '../../department/department.entity';


export class MenuItem extends Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  preview: string;

  @Column({
    type: 'enum',
    enum: MenuItemEnum,
    default: MenuItemEnum.None
  })
  menu_item_type: MenuItemEnum;

  @OneToOne(() => Entry, entry => entry.menu_item)
  entry: Entry;

  @OneToOne(() => Rubric, rubric => rubric.menu_item)
  rubric: Rubric;

  @OneToOne(() => Department, department => department.menu_item)
  department: Department;

  // @OneToOne(() => Exhibi)
}