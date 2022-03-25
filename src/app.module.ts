import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import AdminJS from 'adminjs';
import { adminOptions, adminAuth } from './admin.options'
import { DepartmentModule } from './department/department.module';
import { EntryModule } from './entry/entry.module';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { UploadModule } from './upload/upload.module';
import { MinioModule } from './minio/minio.module';
import { Config } from './config';
import { RubricModule } from './rubric/rubric.module';
import { MenuModule } from './menu/menu.module';
import { CommanderModule } from './commander/commander.module';
import { ConsoleModule } from '@squareboat/nest-console';

AdminJS.registerAdapter({ Database, Resource })

@Module({
  imports: [
    ConfigModule.forRoot({}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    TypeOrmModule.forRoot({
      type: Config.DB_OPTIONS.type,
      host: Config.DB_OPTIONS.host,
      port: Config.DB_OPTIONS.port,
      username: Config.DB_OPTIONS.username,
      password: Config.DB_OPTIONS.password,
      database: Config.DB_OPTIONS.database,
      synchronize: Config.DB_OPTIONS.synchronize,
      autoLoadEntities: Config.DB_OPTIONS.autoLoadEntities
    }),
    AdminModule.createAdmin({
      adminJsOptions: adminOptions,
      auth: adminAuth
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    DepartmentModule,
    EntryModule,
    TaskModule,
    ExhibitionModule,
    UploadModule,
    MinioModule,
    RubricModule,
    MenuModule,
    CommanderModule,
    ConsoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
