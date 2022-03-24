import dotenv from './dotenv'
import { DbOptionsType } from './config.types';

dotenv.config()
export const DbConfig: DbOptionsType = JSON.parse(process.env.DB_OPTIONS)
