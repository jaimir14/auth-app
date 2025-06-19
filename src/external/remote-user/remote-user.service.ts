import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RemoteUser } from './remote-user.interface';

@Injectable()
export class RemoteUserService {
  constructor(private readonly httpService: HttpService) {}

  async fetchRemoteUserData(
    username: string,
    apiUrl: string,
    imei: string,
  ): Promise<RemoteUser> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<RemoteUser>(`${apiUrl}/api/user/internal-login`, {
          username,
          imei,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to fetch remote user:', error.message);
      } else {
        console.error('Unknown error occurred while fetching remote user');
      }
      throw new Error('Unable to fetch remote user data');
    }
  }
}
