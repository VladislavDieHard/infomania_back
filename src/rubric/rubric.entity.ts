import { BaseEntity, Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entry } from '../entry/entry.entity';
import { MenuItem } from '../menu/entities/menu_item.entity';


@Entity()
export class Rubric extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  date_of_create: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  date_of_edit: Date;

  @Column({ unique: true, nullable: false })
  slug: string;

  @ManyToMany(() => Entry, entry => entry.rubrics)
  entries: Entry[];

  @OneToOne(() => MenuItem, menuItem => menuItem.rubric)
  menu_item: MenuItem;
}