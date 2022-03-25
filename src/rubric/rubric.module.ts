import { Module } from '@nestjs/common';
import { RubricController } from './rubric.controller';
import { RubricService } from './rubric.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubric } from './rubric.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rubric])
  ],
  controllers: [RubricController],
  providers: [RubricService]
})
export class RubricModule {}
