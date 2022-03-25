import { Module } from '@nestjs/common';
import { CommandService } from './commander.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule
  ],
  providers: [
    CommandService
  ]
})
export class CommanderModule {}
