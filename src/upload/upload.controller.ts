import { Controller, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadFields, UploadFilesName, UploadType } from './upload.type';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private uploadService: UploadService
  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor(UploadFields))
  uploadFile(@UploadedFiles() uploadData: UploadType) {
    if (!(<any>Object).values(UploadFilesName).includes(Object.keys(uploadData)[0])) return HttpStatus.BAD_REQUEST
    const file = uploadData[Object.keys(uploadData)[0]][0]
    return this.uploadService.handleFile(file)
  }

}
