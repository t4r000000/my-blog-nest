import { Tweet, TweetSummary } from '../domain/tweet';
import dayjs from 'dayjs';

export interface TweetRepositry {
  findByCreatedAt(dayjs: dayjs.Dayjs): Promise<Tweet[] | null>;
}

export interface TweetSummaryRepositry {
  saveSummary(tweetSummary: TweetSummary): Promise<void>;
}
