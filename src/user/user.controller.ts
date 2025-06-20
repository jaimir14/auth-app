import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('imei') imei: string,
  ): Promise<any> {
    return this.userService.login(username, password, imei);
  }
  @Post('create')
  async create(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('apiUrl') apiUrl: string,
  ): Promise<any> {
    return this.userService.create(username, password, apiUrl);
  }
}