import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Token from './token.model';
import User from '../user/user.model';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

@Module({
  imports: [SequelizeModule.forFeature([Token, User])],
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
