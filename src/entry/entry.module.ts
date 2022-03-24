import { Module } from '@nestjs/common';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry])
  ],
  controllers: [EntryController],
  providers: [EntryService]
})
export class EntryModule {}
