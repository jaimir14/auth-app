// src/external/external.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RemoteUserService } from './remote-user/remote-user.service';

@Module({
  imports: [HttpModule],
  providers: [RemoteUserService],
  exports: [RemoteUserService],
})
export class ExternalModule {}
