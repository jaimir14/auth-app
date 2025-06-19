import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { ExternalModule } from './external/external.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): SequelizeModuleOptions => {
        console.log(parseInt(config.get<string>('DATABASE_PORT') || '3306'));
        return {
          dialect: 'mysql',
          host: config.get<string>('DATABASE_HOST'),
          port: parseInt(config.get<string>('DATABASE_PORT') || '3306'),
          username: config.get<string>('DATABASE_USER'),
          password: config.get<string>('DATABASE_PASSWORD'),
          database: config.get<string>('DATABASE_NAME'),
          models: [__dirname + '/**/*.model{.ts,.js}'],
          autoLoadModels: true,
          synchronize: true,
          logging: console.log,
        };
      },
    }),
    UserModule,
    TokenModule,
    ExternalModule,
  ],
})
export class AppModule {}
