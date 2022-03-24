import dotenv from './dotenv'

dotenv.config()
export const CommonConfig = {
  JWT_SECRET: process.env.JWT_SECRET
}