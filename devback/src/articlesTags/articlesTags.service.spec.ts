import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesTagsService } from './articlesTags.service';

describe('ArticlesTagsService', () => {
  let service: ArticlesTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesTagsService],
    }).compile();

    service = module.get<ArticlesTagsService>(ArticlesTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});