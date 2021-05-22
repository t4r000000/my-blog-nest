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
  private id: string;
  private created_at: dayjs.Dayjs;
  private publicMetrics: publicMetrics;
  private text: string;

  constructor(
    id: string,
    created_at: string,
    publicMetrics: publicMetrics,
    text: string,
  ) {
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
  private lasterUpdated: dayjs.Dayjs;
  private mostFavoredTweet?: mostFavoredTweet;

  constructor(
    yyyyMM: string,
    counts: number,
    lasterUpdated: string,
    mostFavoredTweet?: mostFavoredTweet,
  ) {
    this.yyyyMM = yyyyMM;
    this.counts = counts;
    this.lasterUpdated = dayjs(lasterUpdated);
    this.mostFavoredTweet = mostFavoredTweet;
  }

  inclement = () => {
    this.counts = this.counts + 1;
  };

  setMostFavoredTweet = (id: number, foveredCount: number) => {
    this.mostFavoredTweet = {
      id: id,
      foveredCount: foveredCount,
    };
  };

  getYYYYMM = () => {
    return this.yyyyMM;
  };

  getMostFavoredTweet = () => {
    //Fix it: mostFavoredTweetない時に適当なあたい返してるけどこれいいのか？例外投げるべきか？
    if (typeof this.mostFavoredTweet === 'undefined') {
      return { id: 0, foveredCount: 0 };
    }
    return this.mostFavoredTweet;
  };

  getLastUpdated = () => {
    return this.lasterUpdated;
  };

  getCounts = () => {
    return this.counts;
  };
}
