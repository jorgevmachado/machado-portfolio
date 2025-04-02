import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { File } from './file';
import { BadRequestException } from '@nestjs/common';

jest.mock('fs');
jest.mock('fs/promises', () => ({
  writeFile: jest.fn(),
}));

describe('File Class', () => {
  let file: File;
  const mockFile: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'test-image.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 1024,
    buffer: Buffer.from('mock file content'),
    destination: 'uploads/',
    filename: 'test-image.jpeg',
    path: 'uploads/test-image.jpeg',
    stream: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    file = new (class extends File {})();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getPath', () => {
    it('should return the path of the file with default file structure', () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false);
      const result = file.getPath(mockFile);
      expect(result).toContain('uploads/test-image.jpeg');
    });

    it('should return the path of the file with provided filename', () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      const result = file.getPath(mockFile, 'custom-file-name');
      expect(result).toContain('uploads/custom-file-name.jpeg');
    });

    it('should throw BadRequestException if file does not exist', () => {
      expect(() => file.getPath(null)).toThrow(BadRequestException);
    });

    it('should throw BadRequestException if file already exists', () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);

      expect(() => file.getPath(mockFile)).toThrow(BadRequestException);
    });
  });

  describe('uploadFile', () => {
    it('should successfully upload the file and return the path', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false);
      jest.spyOn(file, 'getPath').mockReturnValue('uploads/test-image.jpeg');

      (writeFile as jest.MockedFunction<typeof writeFile>).mockResolvedValue();

      const result = await file.uploadFile(mockFile);

      expect(result).toBe('uploads/test-image.jpeg');
      expect(writeFile).toHaveBeenCalledWith(
        'uploads/test-image.jpeg',
        mockFile.buffer,
      );
    });

    it('should throw BadRequestException if file is invalid', async () => {
      await expect(file.uploadFile(null)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if getPath throws error', async () => {
      jest.spyOn(file, 'getPath').mockImplementation(() => {
        throw new BadRequestException('File not received or invalid.');
      });

      await expect(file.uploadFile(mockFile)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if writeFile fails', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false);
      jest.spyOn(file, 'getPath').mockReturnValue('uploads/test-image.jpeg');
      (writeFile as jest.MockedFunction<typeof writeFile>).mockRejectedValue(
        new Error('Write failed'),
      );

      await expect(file.uploadFile(mockFile)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});