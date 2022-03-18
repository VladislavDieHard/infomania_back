import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MINIO_CONNECTION } from 'nestjs-minio/dist';
import { ImageFormats, UploadFilesName } from './upload.type';
import { Buffer } from "buffer";

@Injectable()
export class UploadService {
  client: ClientProxy;
  constructor(@Inject(MINIO_CONNECTION) private readonly minioClient) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'upload_queue',
        noAck: false,
        queueOptions: {
          durable: false,
        }
      },
    });
  }

  handleFile(file): Promise<object> {
    console.log(file);

    if (file.fieldname === UploadFilesName.Zip && file.mimetype.split('/').pop() === UploadFilesName.Zip) {
      return this.uploadFile(file, UploadFilesName.Zip)
    } else if (ImageFormats.includes(file.mimetype.split('/').pop()) && file.fieldname === UploadFilesName.Image) {
      return this.uploadFile(file, UploadFilesName.Image)
    }
    // return this.client.send('file_handler', {
    //   meta: {
    //     fieldName: files.image[0].fieldname,
    //     name: files.image[0].originalname,
    //     mimetype: files.image[0].mimetype
    //   },
    //   buffer: Buffer.from(files.image[0].buffer)
    // });
    // this.minioClient.putObject('images', files.image[0].originalname, files.image[0].buffer)
  }

  async uploadFile(file, fileType): Promise<object> {
    let date = new Date();
    let year = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('ru', { month: 'numeric' }).format(date);
    let day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(date);
    const formatDate = `${day}-${month}-${year}`
    const filePath = `${formatDate}/${file.originalname.replace(/ /g,"_")}`
    const buffer = Buffer.from(file.buffer)
    try {
      await this.minioClient.putObject(fileType, filePath, buffer)
      return {
        message: 'success',
        path: `/${fileType}/${filePath}`
      }
    } catch (e) {
      return e
    }
  }

}
