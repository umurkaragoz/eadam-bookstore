import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bookstore')
export class BookstoreEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'bookstore_id' })
  bookstoreId: number;

  @Column('varchar')
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
