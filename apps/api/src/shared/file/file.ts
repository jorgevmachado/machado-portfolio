import { writeFile } from 'fs/promises';
import { join } from 'path';
import fs from 'fs';

import { BadRequestException } from '@nestjs/common';

export abstract class File {
  async uploadFile(file: Express.Multer.File, filename?: string) {
    const filePath = this.getPath(file, filename);

    try {
      await writeFile(filePath, file.buffer);
    } catch (error) {
      throw new BadRequestException('Failed to save file.');
    }

    return filePath;
  }

  getPath(file: Express.Multer.File, filename?: string) {
    if (!file) {
      throw new BadRequestException('File not received or invalid.');
    }
    const uploadsFolderPath = join(process.cwd(), 'uploads');
    const mimeType = file.mimetype.split('/')[1];
    const currentPath = filename
      ? `${filename}.${mimeType}`
      : file.originalname;
    const filePath = join(uploadsFolderPath, currentPath);

    if (fs.existsSync(filePath)) {
      throw new BadRequestException('File already exists or is invalid.');
    }

    return filePath;
  }
}