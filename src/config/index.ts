import { ConfigType } from './config.types';
import { S3Config } from './s3.config';
import { DbConfig } from './db.config';
import { CommonConfig } from './common.config';

export const Config: ConfigType = {
  S3_ENDPOINT: S3Config.endPoint,
  JWT_SECRET: CommonConfig.JWT_SECRET,
  DB_OPTIONS:  DbConfig,
  S3_OPTIONS: S3Config
}