import { TweetImplementAsDynamo } from './tweet.dynamo';
//import dayjs from 'dayjs';

describe('Tweet Dynamo', () => {
  const dynamoClient = new TweetImplementAsDynamo();

  it('should be defined', () => {
    expect(dynamoClient).toBeDefined();
  });

  // it('should be defined', async () => {
  //   const startDate = dayjs().startOf('month');
  //   try {
  //     const tweetData = await dynamoClient.findFromCreatedAt(startDate);
  //     console.log('カウント', tweetData?.length);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   expect(dynamoClient).toBeDefined();
  // });
});
