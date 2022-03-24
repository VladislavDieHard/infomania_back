export type DbOptionsType = {
  type: "mysql" | "mariadb",
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  synchronize: boolean,
  autoLoadEntities: boolean
}

export type S3OptionsType = {
  endPoint: string,
  port: number,
  useSSL: boolean,
  accessKey: string,
  secretKey: string
}

export type ConfigType = {
  S3_ENDPOINT: string,
  JWT_SECRET: string,
  DB_OPTIONS: DbOptionsType,
  S3_OPTIONS: S3OptionsType
}