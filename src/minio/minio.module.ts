import { Module } from '@nestjs/common';
import { NestMinioModule } from 'nestjs-minio/dist';
import { Config } from '../config';

@Module({
  imports: [
    NestMinioModule.register({
      endPoint: Config.S3_OPTIONS.endPoint,
      port: Config.S3_OPTIONS.port,
      useSSL: Config.S3_OPTIONS.useSSL,
      accessKey: Config.S3_OPTIONS.accessKey,
      secretKey: Config.S3_OPTIONS.secretKey,
    })
  ]
})
export class MinioModule {}
