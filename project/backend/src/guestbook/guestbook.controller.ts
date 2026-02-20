import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GuestbookService } from './guestbook.service'; // This is the line you are likely missing

@Controller('guestbook')
export class GuestbookController {
  // NestJS injects the service here
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  async findAll() {
    return await this.guestbookService.findAll();
  }

  @Post()
  async create(@Body() payload: { name: string; message: string }) {
    return await this.guestbookService.create(payload);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('message') message: string) {
    return await this.guestbookService.update(id, message);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.guestbookService.delete(id);
  }
}
