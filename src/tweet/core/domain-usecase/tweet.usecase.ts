import { Tweet, TweetSummary } from '../domain/tweet';
import {
  TweetRepositry,
  TweetSummaryRepositry,
} from '../domain-repositry/tweet.repositry';
import dayjs from 'dayjs';

class TweetUseCase {
  private readonly tweetRepositry: TweetRepositry;
  private readonly tweetSummaryRepositry: TweetSummaryRepositry;
  constructor(
    tweetRepositry: TweetRepositry,
    tweetSummaryRepositry: TweetSummaryRepositry,
  ) {
    this.tweetRepositry = tweetRepositry;
    this.tweetSummaryRepositry = tweetSummaryRepositry;
  }

  summarizeTweets = (): Promise<Tweet[]> => {
    return new Promise((resolve, reject) => {
      this.tweetRepositry
        .findByCreatedAt(dayjs().startOf('month'))
        .then((tweets) => {
          const tweetSummary = new TweetSummary(dayjs().startOf('month'));
          tweets.forEach((tweet) => {});
        })
        .catch((err) => {
          reject(new Error(err));
        });
    });
  };
}

export default TweetUseCase;
