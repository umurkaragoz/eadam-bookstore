import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookstoreEntity } from '../core/entities/bookstore.entity';
import { BookInventoryEntity } from '../core/entities/book-inventory.entity';
import { BookEntity } from '../core/entities/book.entity';

@Injectable()
export class BookstoresService {
  constructor(
    @InjectRepository(BookstoreEntity)
    private readonly bookstoreRepo: Repository<BookstoreEntity>,
    @InjectRepository(BookInventoryEntity)
    private readonly bookInventoryRepo: Repository<BookInventoryEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepo: Repository<BookEntity>,
  ) {}

  async find(): Promise<BookstoreEntity[]> {
    return await this.bookstoreRepo.find();
  }

  async getInventory(bookstoreId: number) {
    const bookIds = await this.bookInventoryRepo
      .find({
        select: ['bookId'],
        where: { bookstoreId },
      })
      .then((bookInventories) =>
        bookInventories.map((bookInventory) => bookInventory.bookId),
      );

    return await this.bookRepo.find({
      where: {
        bookId: In(bookIds),
      },
    });
  }
}
