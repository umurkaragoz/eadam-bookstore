import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookstoreService } from './bookstore.service';
import { BookstoreEntity } from '../core/entities/bookstore.entity';
import { BookstoreController } from './bookstore.controller';
import { JwtModule } from '@nestjs/jwt';
import { BookInventoryEntity } from '../core/entities/book-inventory.entity';
import { BookEntity } from '../core/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookstoreEntity,
      BookInventoryEntity,
      BookEntity,
    ]),
    JwtModule,
  ],
  providers: [BookstoreService],
  exports: [BookstoreService],
  controllers: [BookstoreController],
})
export class BookstoreModule {}
