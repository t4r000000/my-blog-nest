import { Tweet, TweetSummary } from '../domain/tweet';
import dayjs from 'dayjs';

export interface TweetRepositry {
  findFromCreatedAt(dayjs: dayjs.Dayjs): Promise<Tweet[] | null>;
  saveSummary(tweetSummary: TweetSummary): Promise<void>;
}
