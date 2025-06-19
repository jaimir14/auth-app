import { Test, TestingModule } from '@nestjs/testing';
import { RemoteUserService } from './remote-user.service';

describe('RemoteUserService', () => {
  let service: RemoteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoteUserService],
    }).compile();

    service = module.get<RemoteUserService>(RemoteUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
