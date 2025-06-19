import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import User from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ExternalModule } from '../external/external.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), ExternalModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
