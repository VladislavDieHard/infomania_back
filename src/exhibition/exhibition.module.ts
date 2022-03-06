import { Module } from '@nestjs/common';
import { ExhibitionController } from './exhibition.controller';

@Module({
  controllers: [ExhibitionController]
})
export class ExhibitionModule {}
