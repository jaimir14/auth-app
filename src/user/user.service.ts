import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import User from './user.model';
import * as bcrypt from 'bcrypt';
import { UniqueConstraintError } from 'sequelize';
import { RemoteUserService } from 'src/external/remote-user/remote-user.service';
import { RemoteUser } from 'src/external/remote-user/remote-user.interface';

@Injectable()
export class UserService {
  constructor(private remoteUserService: RemoteUserService) {}

  async login(username: string, password: string, imei: string): Promise<any> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const passwordValid = await bcrypt.compare(password, user.get('password'));
    if (!passwordValid) {
      return { success: false, message: 'Invalid credentials' };
    }

    const remoteData: RemoteUser =
      await this.remoteUserService.fetchRemoteUserData(
        username,
        user.get('apiUrl'),
        imei,
      );

    return remoteData;
  }

  async create(
    username: string,
    password: string,
    apiUrl: string,
  ): Promise<any> {
    try {
      const created = await User.create({ username, password, apiUrl });

      if (!created) {
        throw new InternalServerErrorException('User not created');
      }

      return {
        success: true,
        message: 'User created',
      };
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictException('Username already exists'); // ⛔ 409
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Unexpected error during user creation',
      ); // ⛔ 500
    }
  }
}
