import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  findAll() {
    return this.guestbookService.findAll();
  }

  @Post()
  create(@Body() payload: { name: string; message: string }) {
    return this.guestbookService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('message') message: string) {
    return this.guestbookService.update(id, message);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.guestbookService.delete(id);
  }
}