import { Module } from '@nestjs/common';
import { UserSeeder } from './user.seeder';
import { BookstoreSeeder } from './bookstore.seeder';
import { BookSeeder } from './book.seeder';
import { BookInventorySeeder } from './book-inventory.seeder';

@Module({
  imports: [],
  providers: [UserSeeder, BookstoreSeeder, BookSeeder, BookInventorySeeder],
  exports: [UserSeeder, BookstoreSeeder, BookSeeder, BookInventorySeeder],
})
export class SeederModule {}
