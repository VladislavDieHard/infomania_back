import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {

  @Cron('* */12 * * *')
  migrateData() {
    console.log('Migration data service')
  }

}