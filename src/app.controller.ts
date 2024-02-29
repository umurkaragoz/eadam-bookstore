import { Controller, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  async onApplicationBootstrap() {
    await this.appService.setupAndSeedDatabase();
  }
}
