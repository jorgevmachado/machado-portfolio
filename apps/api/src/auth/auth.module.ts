import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import AuthBusiness from '@repo/business/auth/business';

import { AuthJwtStrategy } from './strategy/auth-jwt.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import {diskStorage} from "multer";
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';



@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthJwtStrategy, AuthBusiness],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        }
      }),
      limits: {
        fileSize: 2 * 1024 * 1024,
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [AuthJwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
