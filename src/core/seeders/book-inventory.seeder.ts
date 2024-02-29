import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BookstoreEntity } from '../entities/bookstore.entity';
import { BookInventoryEntity } from '../entities/book-inventory.entity';
import { BookEntity } from '../entities/book.entity';

@Injectable()
export class BookInventorySeeder {
  constructor(private dataSource: DataSource) {}

  async seedIfTableIsEmpty() {
    const numEntities = await this.dataSource
      .getRepository(BookInventoryEntity)
      .count();

    const bookIds = await this.dataSource
      .getRepository(BookEntity)
      .find({ select: ['bookId'] })
      .then((books) => books.map((book) => book.bookId));

    if (numEntities) {
      return false;
    }

    const bookstoreIds = await this.dataSource
      .getRepository(BookstoreEntity)
      .find({
        select: ['bookstoreId'],
      })
      .then((bookstores) =>
        bookstores.map((bookstore) => bookstore.bookstoreId),
      );

    for (const bookstoreId of bookstoreIds) {
      const randomBookIds = [];
      for (const bookId of bookIds) {
        // each bookstore will have approximately a quarter of the available book.
        if (Math.random() >= 0.25) continue;
        randomBookIds.push(bookId);
      }

      const bookInventories = [];
      for (const bookId of randomBookIds) {
        bookInventories.push({
          bookId: bookId,
          bookstoreId: bookstoreId as any,
          quantity: Math.ceil(Math.random() * 100),
        });
      }

      // bulk insert book inventory data for this bookstore
      await this.dataSource
        .getRepository(BookInventoryEntity)
        .insert(bookInventories);
    }
  }
}
