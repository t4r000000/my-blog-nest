//Fix it: read capacity制限にかかったら、時間を置いて再度実行する処理

import { Tweet } from '../core/domain/tweet';
import { TweetRepositry } from '../core/domain-repositry/tweet.repositry';

import dayjs from 'dayjs';
import {
  AttributeValue,
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/client-dynamodb';

export class TweetImplementAsDynamo implements TweetRepositry {
  private readonly dynamoDBClient: DynamoDBClient;
  constructor() {
    this.dynamoDBClient = new DynamoDBClient({
      region: 'ap-northeast-1',
    });
  }

  findFromCreatedAt = (
    createdAt: dayjs.Dayjs,
    lastEvaluatedKey?: { [key: string]: AttributeValue } | undefined,
  ): Promise<Tweet[] | null> => {
    const scanParam: ScanCommandInput = {
      TableName: 'Tweets',
      FilterExpression: '#created_at > :created_at',
      ExpressionAttributeNames: {
        '#created_at': 'created_at',
      },
      ExpressionAttributeValues: {
        ':created_at': { S: createdAt.toISOString() },
      },
      ExclusiveStartKey: lastEvaluatedKey,
    };

    return new Promise((resolve, reject) => {
      this.dynamoDBClient
        .send(new ScanCommand(scanParam))
        .then(async (Tweets) => {
          if (typeof Tweets.Items === 'undefined') {
            resolve(null);
            return;
          }
          if (!this.argIsTweetArray(Tweets.Items)) {
            reject(new Error('DynamoDBから取得したデータ型が不正です'));
            return;
          }
          const tweetArray = Tweets.Items.map((tweet) => {
            const publicMetrics = {
              retweet_count: {
                N: Number(tweet.public_metrics.M.retweet_count.N),
              },
              like_count: {
                N: Number(tweet.public_metrics.M.like_count.N),
              },
            };
            return new Tweet(
              Number(tweet.id.S),
              tweet.created_at.S,
              publicMetrics,
              tweet.text.S,
            );
          });
          if (!Tweets.LastEvaluatedKey) {
            resolve(tweetArray);
            return;
          }
          this.findFromCreatedAt(createdAt, Tweets.LastEvaluatedKey)
            .then((nextTweetArray) => {
              resolve(
                nextTweetArray === null
                  ? tweetArray
                  : tweetArray.concat(nextTweetArray),
              );
              return;
            })
            .catch((error) => {
              reject(new Error(error));
            });
        })
        .catch((error) => reject(new Error(error)));
    });
  };

  argIsTweetArray = (arg: any[]): arg is dynamoTweet[] => {
    if (typeof arg.length !== 'number') return false;
    arg.forEach((tweet) => {
      if (!this.argIsTweet(tweet)) {
        return false;
      }
    });
    return true;
  };

  argIsTweet = (arg: any): arg is dynamoTweet => {
    return (
      typeof arg.text.s === 'string' &&
      typeof arg.id.s === 'string' &&
      typeof arg.author_id.s === 'string' &&
      typeof arg.author_id.s === 'string' &&
      typeof arg.public_metrics.M.like_count.N === 'string' &&
      typeof arg.public_metrics.M.retweet_count.N === 'string'
    );
  };
}

type dynamoTweet = {
  text: { S: string };
  id: { S: string };
  author_id: { S: string };
  created_at: { S: string };
  public_metrics: {
    M: {
      like_count: { N: string };
      reply_count: { N: string };
      quote_count: { N: string };
      retweet_count: { N: string };
    };
  };
};
