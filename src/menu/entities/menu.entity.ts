import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { MenuItem } from './menu_item.entity';


@Entity()
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.menus)
  author: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  date_of_create: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  date_of_edit: Date;

  @OneToMany(() => MenuItem, menuItem => menuItem.menu)
  menu_items: MenuItem;
}