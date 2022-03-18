import { Module } from '@nestjs/common';
import { NestMinioModule } from 'nestjs-minio/dist';

@Module({
  imports: [
    NestMinioModule.register({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'diehard',
      secretKey: 'Linerace2010',
    })
  ]
})
export class MinioModule {}
