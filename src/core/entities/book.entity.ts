import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookInventoryEntity } from './book-inventory.entity';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'book_id' })
  bookId: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => BookInventoryEntity, (bookInventory) => bookInventory.book)
  inventory: Promise<BookInventoryEntity[]>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
