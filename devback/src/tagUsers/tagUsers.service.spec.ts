import { Test, TestingModule } from '@nestjs/testing';
import { tagUsersService } from './tagUsers.service';

describe('tagUsersService', () => {
  let service: tagUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [tagUsersService],
    }).compile();

    service = module.get<tagUsersService>(tagUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});