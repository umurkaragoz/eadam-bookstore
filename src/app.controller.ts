import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  async onApplicationBootstrap() {
    await this.appService.setupAndSeedDatabase();
  }

  @Get()
  @ApiOperation({
    summary: 'List all sessions.',
  })
  getHello(@Req() req): string {
    return req.user;
  }
}
