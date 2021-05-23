import { Injectable } from '@nestjs/common';
import { TweetUseCase } from './core/domain-usecase/tweet.usecase';
import { TweetImplementAsDynamo } from './infrastructure/tweet.dynamo';

@Injectable()
export class TweetService {
  private readonly tweetUsecase: TweetUseCase;
  constructor(private readonly tweetImplementAsDynamo: TweetImplementAsDynamo) {
    this.tweetUsecase = new TweetUseCase(this.tweetImplementAsDynamo);
  }

  saveMonthlySummary = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.tweetUsecase
        .summarizeLastMonthTweets()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
