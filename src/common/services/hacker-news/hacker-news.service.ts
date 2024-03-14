import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { WordCountService } from '../word-count/word-count.service';

@Injectable()
export class HackerNewsService {
  constructor(private readonly wordCountService: WordCountService) {}

  async getTop10WordsLast25Stories(): Promise<string[]> {
    try {
      const response = await axios.get(
        `${process.env.HACKER_NEWS_API_URL}/newstories.json`,
      );
      const last25Stories = response.data.slice(0, 25);
      const titles = await Promise.all(
        last25Stories.map(async (id: number) => {
          const storyResponse = await axios.get(
            `${process.env.HACKER_NEWS_API_URL}/item/${id}.json`,
          );
          return storyResponse.data.title;
        }),
      );
      return this.wordCountService.getTopWords(titles, 10);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch top 10 words from last 25 stories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTop10WordsLastWeekStories(): Promise<string[]> {
    try {
      const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
      const oneWeekAgo = currentTime - 7 * 24 * 60 * 60;

      const response = await axios.get(
        `${process.env.HACKER_NEWS_API_URL}/newstories.json`,
      );
      const storyIds = response.data;

      const titles = await Promise.all(
        storyIds.map(async (storyId: number) => {
          const storyResponse = await axios.get(
            `${process.env.HACKER_NEWS_API_URL}/item/${storyId}.json`,
          );
          const storyTime = storyResponse.data.time;
          if (storyTime >= oneWeekAgo && storyTime <= currentTime) {
            return storyResponse.data.title;
          }
        }),
      );

      return this.wordCountService.getTopWords(titles, 10);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch top 10 words from last Week stories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTop10WordsWithHighKarmaStories(): Promise<string[]> {
    try {
      const response = await axios.get(
        `${process.env.HACKER_NEWS_API_URL}/newstories.json`,
      );
      const storyIds = response.data;

      const storyRequests = storyIds.map(async (id: number) => {
        const storyResponse = await axios.get(
          `${process.env.HACKER_NEWS_API_URL}/item/${id}.json`,
        );
        const userId = storyResponse.data.by;
        return { storyTitle: storyResponse.data.title, userId };
      });
      const storyDetails = await Promise.all(storyRequests);

      const userDetails = await Promise.all(
        storyDetails.map(async ({ userId }) => {
          const userResponse = await axios.get(
            `${process.env.HACKER_NEWS_API_URL}/user/${userId}.json`,
          );
          const userKarma = userResponse.data.karma;
          return { userId, userKarma };
        }),
      );

      const titles: string[] = storyDetails.map((storyDetail, index) => {
        const { userKarma } = userDetails[index];
        if (userKarma >= 10000) {
          return storyDetail.storyTitle;
        }
      });

      return this.wordCountService.getTopWords(titles, 10);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch top 10 words from High Karma Users stories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
