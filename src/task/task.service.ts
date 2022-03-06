import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class TaskService {

  @Interval(1000 * 100 * 60 * 12)
  migrateData() {
    console.log('Migration data service')
  }

}