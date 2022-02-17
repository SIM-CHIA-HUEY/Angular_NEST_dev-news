import { Test, TestingModule } from '@nestjs/testing';
import { ArticleDislikesService } from './articleDislikes.service';

describe('ArticleDislikesService', () => {
  let service: ArticleDislikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleDislikesService],
    }).compile();

    service = module.get<ArticleDislikesService>(ArticleDislikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});