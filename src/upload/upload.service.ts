import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio/dist';
import { ImageFormats, UploadFilesName } from './upload.type';
import { Buffer } from "buffer";

@Injectable()
export class UploadService {
  constructor(@Inject(MINIO_CONNECTION) private readonly minioClient) {}

  async handleFile(file): Promise<object> {
    if (file.fieldname === UploadFilesName.Zip && file.mimetype.split('/').pop() === UploadFilesName.Zip) {
      return await this.uploadFile(file, UploadFilesName.Zip);
    } else if (ImageFormats.includes(file.mimetype.split('/').pop()) && file.fieldname === UploadFilesName.Image) {
      return await this.uploadFile(file, UploadFilesName.Image);
    }
  }

   private async checkBucketExist(bucketName): Promise<boolean> {
    let result;
    try {
      result = await this.minioClient.bucketExists(bucketName);
    } catch (e) {
      result = false;
    }
    return result;
  }

  private static createFilePath(file) {
    let date = new Date();
    let year = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('ru', { month: 'numeric' }).format(date);
    let day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(date);
    const formatDate = `${day}/${month}/${year}`;
    return `${formatDate}/${file.originalname.replace(/ /g,"_")}`;
  }

  async uploadFile(file, fileType): Promise<object> {
    const filePath = UploadService.createFilePath(file);
    const buffer = Buffer.from(file.buffer);
    try {
      const bucketExists = await this.checkBucketExist(fileType);
      if (bucketExists) {
        await this.minioClient.putObject(fileType, filePath, buffer);
        return {
          message: 'success',
          path: `/${fileType}/${filePath}`
        }
      } else {
        return new HttpException('Can\'t download file with this type', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      return e.message;
    }
  }

}
