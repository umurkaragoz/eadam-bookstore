import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookInventoryEntity } from './book-inventory.entity';

@Entity('bookstore')
export class BookstoreEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'bookstore_id' })
  bookstoreId: number;

  @Column('varchar')
  name: string;

  @OneToMany(
    () => BookInventoryEntity,
    (bookInventory) => bookInventory.bookstore,
  )
  inventory: Promise<BookInventoryEntity[]>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
