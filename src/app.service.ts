import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
// import { NestApplication } from '@nestjs/core';

@Injectable()
export class AppService {
  constructor(
    // @Inject('NestApplication') private app: NestApplication,
    private Configuration: ConfigService,
  ) {}

  GetFileListing(): Observable<string[]> {
    return new Observable((observer) => {
      fs.readdir(path.join(__dirname, '../uploads'), (err, files) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(files.map((item) => `${item}`));
          observer.complete();
        }
      });
    });
  }
}
