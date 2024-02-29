import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BookstoreService } from './bookstore.service';
import { BookstoreEntity } from '../core/entities/bookstore.entity';

@Controller('bookstore')
@ApiBearerAuth()
@ApiTags('Bookstores')
@UseGuards(AuthGuard)
export class BookstoreController {
  constructor(private readonly bookstoreService: BookstoreService) {}

  @Get()
  @ApiOperation({
    summary: 'List all bookstore.',
  })
  async listBookstores(): Promise<BookstoreEntity[]> {
    return await this.bookstoreService.find();
  }

  @Get(':id/inventory')
  @ApiOperation({
    summary: 'List available book in this bookstore.',
  })
  findOne(@Param('id') id: string) {
    return this.bookstoreService.getInventory(+id);
  }
}
