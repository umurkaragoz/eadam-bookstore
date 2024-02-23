import { Global, Injectable } from '@nestjs/common';
import { UserSeeder } from './core/seeders/user.seeder';

@Injectable()
export class AppService {
  constructor(private userSeeder: UserSeeder) {}

  async setupAndSeedDatabase() {
    await this.userSeeder.seedIfTableIsEmpty();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
