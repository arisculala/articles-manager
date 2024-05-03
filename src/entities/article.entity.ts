import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'author' })
  author: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'headline' })
  headline: string;

  @Column({ name: 'subhead' })
  subhead: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' }) // Automatically sets the column value to the current timestamp when a new row is inserted
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // Automatically sets the column value to the current timestamp when a row is updated
  updatedAt: Date;

  // define the relationship between Article and User entities
  @ManyToOne(() => UserEntity, user => user.articles, { eager: true }) // Use eager loading to load user data automatically
  @JoinColumn({ name: 'author' })
  user: UserEntity;
}
