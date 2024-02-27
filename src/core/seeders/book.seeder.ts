import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { BookEntity } from '../entities/book.entity';

@Injectable()
export class BookSeeder {
  constructor(private dataSource: DataSource) {}

  async seedIfTableIsEmpty() {
    const numEntities = await this.dataSource.getRepository(BookEntity).count();

    if (numEntities) {
      return false;
    }

    for (let i = 0; i < 200; i++) {
      await this.dataSource.getRepository(BookEntity).insert({
        name:
          faker.word.verb() +
          ' ' +
          faker.word.adjective() +
          ' ' +
          faker.word.noun(),
      });
    }
  }
}
