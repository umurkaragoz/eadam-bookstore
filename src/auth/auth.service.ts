import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateBasic(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);

    if (!match) return null;

    return user;
  }

  async issueToken(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    const payload = {
      sub: user.userId,
      email: user.email,
      type: user.userType,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
