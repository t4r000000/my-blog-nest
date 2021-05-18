import dayjs from 'dayjs';

type publicMetrics = {
  retweet_count: {
    N: number;
  };
  like_count: {
    N: number;
  };
  reply_count?: {
    N: number;
  };
  quote_count?: {
    N: number;
  };
};

export class Tweet {
  private id: number;
  private created_at: dayjs.Dayjs;
  private publicMetrics: publicMetrics;
  private text: string;

  constructor(id: number, created_at: string, publicMetrics, text: string) {
    this.id = id;
    this.created_at = dayjs(created_at);
    this.publicMetrics = publicMetrics;
    this.text = text;
  }

  getId = () => {
    return this.id;
  };
  getCreatedAt = () => {
    return this.created_at;
  };
  getPublicMetrics = () => {
    return this.publicMetrics;
  };
  getText = () => {
    return this.text;
  };
}

type mostFavoredTweet = {
  id: number;
  foveredCount: number;
};

export class TweetSummary {
  private yyyyMM: string;
  private counts: number;
  private mostFavoredTweet: mostFavoredTweet;
  private lasterUpdated: dayjs.Dayjs;

  constructor(
    yyyyMM: string,
    counts: number,
    mostFavoredTweet: mostFavoredTweet,
    lasterUpdated: dayjs.Dayjs,
  ) {
    this.yyyyMM = yyyyMM;
    this.counts = counts;
    this.mostFavoredTweet = mostFavoredTweet;
    this.lasterUpdated = lasterUpdated;
  }

  inclement = () => {
    this.counts = this.counts + 1;
  };

  setMostFavoredTweet = (id: number, foveredCount: number) => {
    this.mostFavoredTweet.id = id;
    this.mostFavoredTweet.foveredCount = foveredCount;
  };

  getYYYYMM = () => {
    return this.yyyyMM;
  };

  getMostFavoredTweet = () => {
    return this.mostFavoredTweet;
  };
}
