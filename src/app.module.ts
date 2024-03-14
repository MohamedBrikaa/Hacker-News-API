import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HackerNewsService } from './common/services/hacker-news/hacker-news.service';
import { ConfigModule } from '@nestjs/config';
import { TopWordsController } from './top-words/top-words.controller';
import { WordCountService } from './common/services/word-count/word-count.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, TopWordsController],
  providers: [
    AppService,
    HackerNewsService,
    HackerNewsService,
    WordCountService,
  ],
})
export class AppModule {}
