import { Test, TestingModule } from '@nestjs/testing';
import { WordCountService } from './word-count.service';

describe('WordCountService', () => {
  let service: WordCountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordCountService],
    }).compile();

    service = module.get<WordCountService>(WordCountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTopWords', () => {
    it('should return top words excluding stop words', () => {
      const titles = [
        'test service bla bla is done for words service',
        'bla bla test is done for hacker service',
      ];
      const expectedTopWords = ['bla', 'test', 'done', 'service'];

      const result = service.getTopWords(titles, 4);
      expect(result).toEqual(expect.arrayContaining(expectedTopWords));
    });

    it('should handle empty titles', () => {
      const titles: string[] = [];
      const expectedTopWords: string[] = [];

      const result = service.getTopWords(titles, 10);

      expect(result).toEqual(expect.arrayContaining(expectedTopWords));
    });

    it('should handle titles with only stop words', () => {
      const titles = ['the', 'a', 'an', 'the', 'and'];
      const expectedTopWords: string[] = [];

      const result = service.getTopWords(titles, 10);

      expect(result).toEqual(expectedTopWords);
    });
  });
});
