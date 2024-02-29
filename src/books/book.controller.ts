import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BooksService } from './books.service';
import { BookEntity } from '../core/entities/book.entity';

@Controller('books')
@ApiBearerAuth()
@ApiTags('Books')
@UseGuards(AuthGuard)
export class BookController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  @ApiOperation({
    summary: 'List all books.',
  })
  async listBooks(): Promise<BookEntity[]> {
    return await this.bookService.find();
  }

  @Get(':id/inventory')
  @ApiOperation({
    summary: 'List available books in this book.',
  })
  findOne(@Param('id') id: string) {
    return this.bookService.getInventory(+id);
  }
}
