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
          if (Tweets.LastEvaluatedKey) {
            try {
              const tweets = await this.findFromCreatedAt(
                createdAt,
                Tweets.LastEvaluatedKey,
              );
            } catch (error) {}

            //resolve('to fix Write Somethin')
          }
          if (typeof Tweets.Items === 'undefined') {
            resolve(null);
            return;
          }

          if (this.argIsTweetArray(Tweets.Items)) {
            resolve(
              Tweets.Items.map((tweet) => {
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
              }),
            );
          }
        })
        .catch((err) => reject(new Error(err)));
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
