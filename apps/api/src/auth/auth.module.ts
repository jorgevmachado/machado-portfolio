import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthJwtStrategy } from './strategy/auth-jwt.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthJwtStrategy],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [AuthJwtStrategy, PassportModule],
})
export class AuthModule {}
