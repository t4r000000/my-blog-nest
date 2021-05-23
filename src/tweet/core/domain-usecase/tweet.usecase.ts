import { TweetSummary } from '../domain/tweet';
import { TweetRepositry } from '../domain-repositry/tweet.repositry';
import dayjs from 'dayjs';

export class TweetUseCase {
  private readonly tweetRepositry: TweetRepositry;
  constructor(tweetRepositry: TweetRepositry) {
    this.tweetRepositry = tweetRepositry;
  }

  //get this month tweets & save summary
  summarizeLastMonthTweets = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const startOfThisMonth = dayjs().startOf('month');
      this.tweetRepositry
        .findFromCreatedAt(startOfThisMonth)
        .then((tweets) => {
          if (tweets == null) {
            reject(
              new Error(
                `No Tweets between ${startOfThisMonth.toISOString()} & ${dayjs().toISOString()}`,
              ),
            );
            return;
          }
          const tweetSummary = new TweetSummary(
            dayjs().startOf('date').toISOString(),
            0,
            dayjs().toISOString(),
          );
          // 集計
          tweets.forEach((tweet) => {
            tweetSummary.inclement();
            if (
              tweet.getPublicMetrics().like_count.N >
              tweetSummary.getMostFavoredTweet().foveredCount
            ) {
              tweetSummary.setMostFavoredTweet(
                Number(tweet.getId()),
                tweet.getPublicMetrics().like_count.N,
              );
            }
          });
          this.tweetRepositry
            .saveSummary(tweetSummary)
            .then(() => {
              resolve();
              return;
            })
            .catch((error: Error) => {
              reject(error);
              return;
            });
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  };
}

export default TweetUseCase;
