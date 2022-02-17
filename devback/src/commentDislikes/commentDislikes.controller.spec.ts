import { Test, TestingModule } from '@nestjs/testing';
import { CommentDislikesController } from './commentDislikes.controller';

describe('CommentDislikesController', () => {
  let controller: CommentDislikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentDislikesController],
    }).compile();

    controller = module.get<CommentDislikesController>(CommentDislikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});