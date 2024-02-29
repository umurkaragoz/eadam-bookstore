import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../core/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findOne(userId: number): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { userId } });

    if (!user)
      throw new NotFoundException(
        `User with ID '${userId}' could not be found.`,
      );

    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  async save(user: UserEntity) {
    return await this.userRepo.save(user);
  }
}
