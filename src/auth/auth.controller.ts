import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    type: LoginDto,
  })
  @ApiOperation({
    summary: 'Login using email and password. Retrieve a JWT token.',
    description:
      'Exchange user email-password information for an API token.<br><br>After a successful login, copy the `access_token` value from the response object, and use it to authenticate all other endpoints.',
  })
  async login(@Req() req) {
    const user = await this.authService.issueToken(req.user);

    return user;
  }
}
