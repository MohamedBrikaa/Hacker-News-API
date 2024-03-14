import { Injectable } from '@nestjs/common';

@Injectable()
export class WordCountService {
  private readonly stopWords = new Set([
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'to',
    'from',
    'of',
    'in',
    'on',
    'at',
    'by',
    'with',
    'for',
    'about',
    'as',
    'is',
    'are',
    'was',
    'were',
    'be',
    'being',
    'been',
    'this',
    'that',
    'these',
    'those',
    'it',
    'he',
    'she',
    'they',
    'we',
    'you',
    'I',
    'me',
    'him',
    'her',
    'them',
    'us',
    'my',
    'your',
    'his',
    'her',
    'its',
    'our',
    'their',
    'mine',
    'yours',
    'hers',
    'ours',
    'theirs',
  ]);

  getTopWords(titles: string[], numOfWords: number): string[] {
    const allTitles = titles.join(' ');

    const cleanedTitles = allTitles.replace(/[^\w\s]/gi, '').toLowerCase();
    const words = cleanedTitles
      .split(/\s+/)
      .filter((word) => !this.stopWords.has(word));

    // Count occurrences of each word
    const wordCounts: { [word: string]: number } = words.reduce((acc, word) => {
      acc[word] = acc[word] ? acc[word] + 1 : 1;
      return acc;
    }, {});

    const sortedWords = Object.keys(wordCounts).sort(
      (a, b) => wordCounts[b] - wordCounts[a],
    );

    return sortedWords.slice(0, numOfWords);
  }
}
