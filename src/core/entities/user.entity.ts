import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserType {
  USER = 'USER',
  STORE_MANAGER = 'STORE_MANAGER',
  ADMIN = 'ADMIN',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  userId: number;

  @Index()
  @Column('varchar', {
    name: 'email',
    unique: true,
    nullable: true,
    length: 165,
  })
  email: string | null;

  @Column()
  password: string;

  @Index()
  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.USER,
  })
  userType: UserType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
