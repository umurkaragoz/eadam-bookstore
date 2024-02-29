import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BookstoresService } from './bookstores.service';
import { BookstoreEntity } from '../core/entities/bookstore.entity';

@Controller('bookstores')
@ApiBearerAuth()
@ApiTags('Bookstores')
@UseGuards(AuthGuard)
export class BookstoreController {
  constructor(private readonly bookstoreService: BookstoresService) {}

  @Get()
  @ApiOperation({
    summary: 'List all bookstores.',
  })
  async listBookstores(): Promise<BookstoreEntity[]> {
    return await this.bookstoreService.find();
  }

  @Get(':id/inventory')
  @ApiOperation({
    summary: 'List available books in this bookstore.',
  })
  findOne(@Param('id') id: string) {
    return this.bookstoreService.getInventory(+id);
  }
}
