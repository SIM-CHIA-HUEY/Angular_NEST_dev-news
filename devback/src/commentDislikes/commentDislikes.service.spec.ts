import { Test, TestingModule } from '@nestjs/testing';
import { CommentDislikesService } from './commentDislikes.service';

describe('CommentDislikesService', () => {
  let service: CommentDislikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentDislikesService],
    }).compile();

    service = module.get<CommentDislikesService>(CommentDislikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});