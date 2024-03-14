import { Test, TestingModule } from '@nestjs/testing';
import { HackerNewsService } from './hacker-news.service';
import { WordCountService } from '../word-count/word-count.service';
import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';

jest.mock('axios');
describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let wordCountService: WordCountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HackerNewsService, WordCountService],
    }).compile();

    service = module.get<HackerNewsService>(HackerNewsService);
    wordCountService = module.get<WordCountService>(WordCountService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTop10WordsLast25Stories', () => {
    it('should return top 10 words from last 25 stories', async () => {
      // Mocking axios response for 50 stories
      const mockedStories = Array.from({ length: 50 }, (_, index) => ({
        data: { title: `Story ${index + 1}` },
      }));
      (axios.get as jest.Mock).mockResolvedValue({ data: mockedStories });

      // Mocking wordCountService
      const topWords: string[] = ['word1', 'word2', 'word3'];
      jest
        .spyOn(wordCountService, 'getTopWords')
        .mockResolvedValue(topWords as never);

      const result = await service.getTop10WordsLast25Stories();

      expect(result).toEqual(topWords);
    });

    it('should throw an error if fetching fails', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to fetch data'),
      );

      await expect(service.getTop10WordsLast25Stories()).rejects.toThrowError(
        new HttpException(
          'Failed to fetch top 10 words from last 25 stories',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('getTop10WordsLastWeekStories', () => {
    it('should return top 10 words from last week stories', async () => {
      // Mocking axios response for last week stories
      const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
      const oneWeekAgo = currentTime - 7 * 24 * 60 * 60;
      const lastWeekStories = Array.from({ length: 50 }, (_, index) => ({
        data: {
          title: `Story ${index + 1}`,
          time: oneWeekAgo + index * 60 * 60,
        },
      }));
      (axios.get as jest.Mock).mockResolvedValue({ data: lastWeekStories });

      // Mocking wordCountService
      const topWords = ['word1', 'word2', 'word3'];
      jest
        .spyOn(wordCountService, 'getTopWords')
        .mockResolvedValue(topWords as never);

      const result = await service.getTop10WordsLastWeekStories();

      expect(result).toEqual(topWords);
    });

    it('should throw an error if fetching fails', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to fetch data'),
      );

      await expect(service.getTop10WordsLastWeekStories()).rejects.toThrowError(
        new HttpException(
          'Failed to fetch top 10 words from last Week stories',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('getTop10WordsWithHighKarmaStories', () => {
    it('should return top 10 words from stories with high karma users', async () => {
      // Mocking axios response for stories
      const storyIds: any[] = [1, 2, 3]; //
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: storyIds });

      // Mocking axios response for user karma
      const userKarmas = [11000, 9000, 12000];
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { karma: userKarmas[0] },
      });
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { karma: userKarmas[1] },
      });
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { karma: userKarmas[2] },
      });

      // Mocking wordCountService
      const topWords = ['word1', 'word2', 'word3'];
      jest
        .spyOn(wordCountService, 'getTopWords')
        .mockResolvedValue(topWords as never);

      const result = await service.getTop10WordsWithHighKarmaStories();

      expect(result).toEqual(topWords);
    });

    it('should throw an error if fetching fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch data'),
      );

      await expect(
        service.getTop10WordsWithHighKarmaStories(),
      ).rejects.toThrowError(
        new HttpException(
          'Failed to fetch top 10 words from High Karma Users stories',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
