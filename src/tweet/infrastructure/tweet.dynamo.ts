//Fix it: read capacity制限にかかったら、時間を置いて再度実行する処理
//Consider it: Dynamoのテーブル月単位に作成するくらいでもいいかも。最低年。
//Check it: then,catch内でネストされてる場所で投げた例外処理が適切にキャッチされてるか確認
//Fix it: ScanCommandの組み立ては関数として分離してもいいかも

import { Tweet, TweetSummary } from '../core/domain/tweet';
import { TweetRepositry } from '../core/domain-repositry/tweet.repositry';

import dayjs from 'dayjs';
import {
  AttributeValue,
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
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
          if (!argIsTweetArray(Tweets.Items)) {
            //例外を投げる原因になったデータもトレースできると嬉しい。基本発生しないはずだが
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
              tweet.id.S,
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
            .catch((error: Error) => {
              reject(error);
            });
        })
        //The level of configured provisioned throughput for the table was exceeded. Consider increasing your provisioning level with the UpdateTable API.
        .catch((error) => reject(error));
    });
  };
  saveSummary(tweetSummary: TweetSummary): Promise<void> {
    const putParam: PutItemCommandInput = {
      TableName: 'TweetSummary',
      Item: {
        yyyyMM: {
          S: tweetSummary.getYYYYMM(),
        },
        counts: {
          N: tweetSummary.getCounts().toString(),
        },
        mostFavoredTweet: {
          M: {
            id: {
              N: tweetSummary.getMostFavoredTweet().id.toString(),
            },
            foveredCount: {
              N: tweetSummary.getMostFavoredTweet().foveredCount.toString(),
            },
          },
        },
      },
    };
    return new Promise((resolve, reject) => {
      this.dynamoDBClient
        .send(new PutItemCommand(putParam))
        .then(() => {
          resolve();
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }
}

const argIsTweetArray = (arg: any[]): arg is dynamoTweet[] => {
  return arg.every(argIsTweet);
};

const argIsTweet = (arg: any): arg is dynamoTweet => {
  return (
    typeof arg.text.S === 'string' &&
    typeof arg.id.S === 'string' &&
    typeof arg.public_metrics.M.like_count.N === 'string' &&
    typeof arg.public_metrics.M.retweet_count.N === 'string'
  );
};

type dynamoTweet = {
  text: { S: string };
  id: { S: string };
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
