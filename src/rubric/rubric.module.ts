import { Module } from '@nestjs/common';
import { RubricController } from './rubric.controller';
import { RubricService } from './rubric.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubric } from './rubric.entity';
import { EntryModule } from '../entry/entry.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rubric]),
    EntryModule
  ],
  controllers: [RubricController],
  providers: [RubricService]
})
export class RubricModule {}
