import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesTagsController } from './articlesTags.controller';

describe('ArticlesTagsController', () => {
  let controller: ArticlesTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesTagsController],
    }).compile();

    controller = module.get<ArticlesTagsController>(ArticlesTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});