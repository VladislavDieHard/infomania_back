import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';


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
}