import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'running';
  }

  @Post('/upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        console.log('xx', file);
        // cb(null, true);
        const allowedMimeTypes = [
          'audio/mpeg',
          'video/mp4',
          'image/jpeg',
          'image/png',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return 'success';
  }

  @Get('/list')
  getList() {
    const data = this.appService.GetFileListing();
    return data;
  }
}
