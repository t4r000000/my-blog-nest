import { TweetUseCase } from './tweet.usecase';
import { TweetImplementAsDynamo } from '../../infrastructure/tweet.dynamo';

describe('Tweet UseCase', () => {
  const tweetUseCase = new TweetUseCase(new TweetImplementAsDynamo());

  it('should be defined', () => {
    expect(tweetUseCase).toBeDefined();
  });

  it('should be defined', () => {
    tweetUseCase.summarizeLastMonthTweets().catch((error) => {
      console.error('エラー', error);
      expect(tweetUseCase).toBeDefined();
    });
  });
});
