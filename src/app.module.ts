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
AdminJS.registerAdapter({ Database, Resource })

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'infomania_db',
      synchronize: true,
      autoLoadEntities: true
    }),
    AdminModule.createAdmin({
      adminJsOptions: adminOptions,
      auth: adminAuth
    }),
    UserModule,
    DepartmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
