import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BookService } from './book.service';
import { BookEntity } from '../core/entities/book.entity';

@Controller('book')
@ApiBearerAuth()
@ApiTags('Books')
@UseGuards(AuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({
    summary: 'List all book.',
  })
  async listBooks(): Promise<BookEntity[]> {
    return await this.bookService.find();
  }

  @Get(':id/inventory')
  @ApiOperation({
    summary: 'List bookstore which this book is available in.',
  })
  findOne(@Param('id') id: string) {
    return this.bookService.getInventory(+id);
  }
}
