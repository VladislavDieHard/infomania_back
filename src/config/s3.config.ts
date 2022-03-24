import { S3OptionsType } from './config.types';
import dotenv from './dotenv'

dotenv.config()
export const S3Config: S3OptionsType = JSON.parse(process.env.S3_OPTIONS)