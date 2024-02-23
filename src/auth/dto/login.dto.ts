import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    required: true,
    default: 'user@bookstore.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    required: true,
    default: 'user-password',
    description: 'User password',
  })
  password: string;
}
