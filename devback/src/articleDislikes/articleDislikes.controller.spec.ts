import { Test, TestingModule } from '@nestjs/testing';
import { ArticleDislikesController } from './articleDislikes.controller';

describe('ArticleDislikesController', () => {
  let controller: ArticleDislikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleDislikesController],
    }).compile();

    controller = module.get<ArticleDislikesController>(ArticleDislikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});