import { Test, TestingModule } from '@nestjs/testing';
import { ArticleLikesController } from './articleLikes.controller';

describe('ArticleLikesController', () => {
  let controller: ArticleLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleLikesController],
    }).compile();

    controller = module.get<ArticleLikesController>(ArticleLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});