import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';
import { BookstoreEntity } from './bookstore.entity';

@Entity('book_inventory')
export class BookInventoryEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'book_inventory_id' })
  bookInventoryId: number;

  @ManyToOne(() => BookEntity, (book) => book.inventory)
  // TypeORM by default uses camelCase column names. Override column name in relation options to use snake_case.
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;

  @Index()
  @Column('int', { name: 'book_id' })
  bookId: number;

  @ManyToOne(() => BookstoreEntity, (bookstore) => bookstore.inventory)
  @JoinColumn({ name: 'bookstore_id' })
  bookstore: BookEntity;

  @Index()
  @Column('int', { name: 'bookstore_id' })
  bookstoreId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
