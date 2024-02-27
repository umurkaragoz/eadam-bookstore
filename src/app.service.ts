import { Injectable } from '@nestjs/common';
import { UserSeeder } from './core/seeders/user.seeder';
import { BookstoreSeeder } from './core/seeders/bookstore.seeder';
import { BookSeeder } from './core/seeders/book.seeder';
import { BookInventorySeeder } from './core/seeders/book-inventory.seeder';

@Injectable()
export class AppService {
  constructor(
    private userSeeder: UserSeeder,
    private bookstoreSeeder: BookstoreSeeder,
    private bookSeeder: BookSeeder,
    private bookInventorySeeder: BookInventorySeeder,
  ) {}

  async setupAndSeedDatabase() {
    await this.userSeeder.seedIfTableIsEmpty();
    await this.bookstoreSeeder.seedIfTableIsEmpty();
    await this.bookSeeder.seedIfTableIsEmpty();
    await this.bookInventorySeeder.seedIfTableIsEmpty();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
