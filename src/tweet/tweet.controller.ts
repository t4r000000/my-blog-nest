import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'summarizeTweet',
    timeZone: 'Asia/Tokyo',
  })
  async saveMonthlySummary(): Promise<string> {
    return new Promise(() => {
      this.tweetService
        .saveMonthlySummary()
        .then(() => {
          console.log('implemented');
        })
        //Fix: Slack 通知飛ばすべべ？
        .catch((error) => console.error(error));
    });
  }
}
