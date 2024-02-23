import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity, UserType } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(private dataSource: DataSource) {}

  async seedIfTableIsEmpty() {
    const numEntities = await this.dataSource.getRepository(UserEntity).count();

    if (numEntities) {
      return false;
    }

    await this.dataSource.getRepository(UserEntity).insert({
      userType: UserType.USER,
      email: 'user@bookstore.com',
      password: await bcrypt.hash('user-password', 12),
    });

    await this.dataSource.getRepository(UserEntity).insert({
      userType: UserType.STORE_MANAGER,
      email: 'manager@bookstore.com',
      password: await bcrypt.hash('manager-password', 12),
    });

    await this.dataSource.getRepository(UserEntity).insert({
      userType: UserType.ADMIN,
      email: 'admin@bookstore.com',
      password: await bcrypt.hash('admin-password', 12),
    });
  }
}
