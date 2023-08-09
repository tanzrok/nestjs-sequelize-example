import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

// configs
import { configs } from '../configs';

// modules
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import { User } from './models/user.model';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true, load: configs }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
        models: [User],
      }),
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
