import { Global, Injectable } from '@nestjs/common';
import { UserSeeder } from './core/seeders/user.seeder';
import { BookstoreSeeder } from './core/seeders/bookstore.seeder';
import { BookSeeder } from './core/seeders/book.seeder';

@Injectable()
export class AppService {
  constructor(
    private userSeeder: UserSeeder,
    private bookstoreSeeder: BookstoreSeeder,
    private bookSeeder: BookSeeder,
  ) {}

  async setupAndSeedDatabase() {
    await this.userSeeder.seedIfTableIsEmpty();
    await this.bookstoreSeeder.seedIfTableIsEmpty();
    await this.bookSeeder.seedIfTableIsEmpty();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
