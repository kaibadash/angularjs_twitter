
module TwitterApp {
	export interface ITimeLineService  {
	    apiUrl: string;
	    requestTimeLine() : any;
		addMentionToTweetText(tweet: ITweet, tweetText: string);
	}
}