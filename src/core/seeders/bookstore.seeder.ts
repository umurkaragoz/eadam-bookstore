import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { BookstoreEntity } from '../entities/bookstore.entity';

@Injectable()
export class BookstoreSeeder {
  constructor(private dataSource: DataSource) {}

  async seedIfTableIsEmpty() {
    const numEntities = await this.dataSource
      .getRepository(BookstoreEntity)
      .count();

    if (numEntities) {
      return false;
    }

    for (let i = 0; i < 20; i++) {
      await this.dataSource.getRepository(BookstoreEntity).insert({
        name: faker.company.name(),
      });
    }
  }
}
