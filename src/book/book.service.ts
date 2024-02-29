import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../core/entities/book.entity';
import { BookInventoryEntity } from '../core/entities/book-inventory.entity';
import { BookstoreEntity } from '../core/entities/bookstore.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepo: Repository<BookEntity>,
    @InjectRepository(BookInventoryEntity)
    private readonly bookInventoryRepo: Repository<BookInventoryEntity>,
    @InjectRepository(BookstoreEntity)
    private readonly bookstoreRepo: Repository<BookstoreEntity>,
  ) {}

  async find(): Promise<BookEntity[]> {
    return await this.bookRepo.find();
  }

  async getInventory(bookId: number) {
    const rows = await this.bookInventoryRepo.find({
      where: { bookId },
      relations: {
        bookstore: true,
      },
    });

    return rows.map((row) => ({
      quantity: row.quantity,
      ...row.bookstore,
    }));
  }
}
