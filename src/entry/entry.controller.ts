import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('entry')
export class EntryController {

  @UseGuards(JwtAuthGuard)
  @Get()
  getEntry() {
    return 'check jwt work'
  }

}
