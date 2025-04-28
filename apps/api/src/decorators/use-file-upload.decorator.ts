import {
  applyDecorators,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

import * as fs from 'fs';
import * as multer from 'multer';

export const UseFileUpload = (allowedTypes: Array<string>) => {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        storage: multer.memoryStorage(),
        fileFilter: (req, file, callback) => {
            if (!allowedTypes.includes(file.mimetype)) {
            return callback(
              new BadRequestException('File type not allowed.'),
              false,
            );
          }
          const uploadsFolderPath = join(process.cwd(), 'uploads');
          const filePath = join(uploadsFolderPath, file.originalname);

          if (fs.existsSync(filePath)) {
            return callback(
              new BadRequestException('File already exists or is invalid.'),
              false,
            );
          }

          callback(null, true);
        },
      }),
    ),
  );
};