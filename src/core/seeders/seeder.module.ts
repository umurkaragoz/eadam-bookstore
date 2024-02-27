import { Module } from '@nestjs/common';
import { UserSeeder } from './user.seeder';
import { BookstoreSeeder } from './bookstore.seeder';
import { BookSeeder } from './book.seeder';

@Module({
  imports: [],
  providers: [UserSeeder, BookstoreSeeder, BookSeeder],
  exports: [UserSeeder, BookstoreSeeder, BookSeeder],
})
export class SeederModule {}
