import { Test, TestingModule } from '@nestjs/testing';
import { tagUsersController } from './tagUsers.controller';

describe('tagUsersController', () => {
  let controller: tagUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [tagUsersController],
    }).compile();

    controller = module.get<tagUsersController>(tagUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});