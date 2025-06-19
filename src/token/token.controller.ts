import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('changePassword/:token')
  @HttpCode(200)
  async changePassword(
    @Param('token') token: string,
    @Body('password') password: string,
  ) {
    await this.tokenService.changePassword(token, password);
  }

  @Post(':userId')
  async generateToken(
    @Param('userId') userId: string,
    @Body('generatedBy') generatedBy: number,
  ) {
    const value = await this.tokenService.generateToken(userId, generatedBy);
    return { value };
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteToken(@Param('id') id: number) {
    await this.tokenService.deleteToken(id);
  }

  @Get('byUser/:userId')
  async getByUser(@Param('userId') userId: number) {
    return await this.tokenService.getByUser(userId);
  }

  @Put('disableToken/:id')
  @HttpCode(200)
  async disableToken(@Param('id') id: number) {
    await this.tokenService.disableToken(id);
  }
}
