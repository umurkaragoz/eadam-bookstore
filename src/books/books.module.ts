import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BookEntity } from '../core/entities/book.entity';
import { BookController } from './book.controller';
import { JwtModule } from '@nestjs/jwt';
import { BookInventoryEntity } from '../core/entities/book-inventory.entity';
import { BookstoreEntity } from '../core/entities/bookstore.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      BookInventoryEntity,
      BookstoreEntity,
    ]),
    JwtModule,
  ],
  providers: [BooksService],
  exports: [BooksService],
  controllers: [BookController],
})
export class BooksModule {}
