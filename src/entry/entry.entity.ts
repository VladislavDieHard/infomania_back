import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

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

  @Column({ type: 'timestamptz' })
  publish_time: Date;

  @Column({ unique: true, nullable: false })
  slug: string;

  // @Column()
  // preview: string;

  // @Column()
  // rubric: Rubric
}