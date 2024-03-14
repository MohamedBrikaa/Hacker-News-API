import { Controller, Get } from '@nestjs/common';
import { HackerNewsService } from '../common/services/hacker-news/hacker-news.service';

@Controller('topWords')
export class TopWordsController {
  constructor(private readonly hackerNewsService: HackerNewsService) {}

  @Get('last25Stories')
  async top10WordsLast25Stories(): Promise<string[]> {
    return this.hackerNewsService.getTop10WordsLast25Stories();
  }

  @Get('lastWeekStories')
  async top10WordsLastWeekStories(): Promise<string[]> {
    return this.hackerNewsService.getTop10WordsLastWeekStories();
  }

  @Get('highKarmaStories')
  async top10WordsHighKarmaStories(): Promise<string[]> {
    return this.hackerNewsService.getTop10WordsWithHighKarmaStories();
  }
}
