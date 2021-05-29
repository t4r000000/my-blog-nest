import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetImplementAsDynamo } from './tweet/infrastructure/tweet.dynamo';
import { TweetController } from './tweet/tweet.controller';
import { TweetService } from './tweet/tweet.service';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [AppController, TweetController],
  providers: [AppService, TweetService, TweetImplementAsDynamo],
})
export class AppModule {}
