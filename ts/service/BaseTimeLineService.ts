
/// <reference path="../model/ITweetList.ts" />
module TwitterApp {
	export class BaseTimeLineService implements ITimeLineService {
	    constructor(
	    	public $resource : ng.resource.IResourceService,
	    	public commonSercice: CommonService) {
	    	console.log("new BaseTimeLineService", $resource, commonSercice);
	    }

	    /* abstract protected */
	    get apiUrl(): string {
	    	throw new Error("not implemented");
	    }

	    public requestTimeLine() : Array<ITweet> {
	    	console.log(this.apiUrl);
	    	var res: ITweetListResource = <ITweetListResource>this.$resource(this.apiUrl);
			var tweets: Array<ITweet> = res.query(); 
	    	return tweets;
	    }
		
		public addMentionToTweetText(tweet: ITweet, tweetText: string) {
			if (tweetText.indexOf("@" + tweet.user.screen_name + " ") >= 0) {
				return tweetText;
			}
			return tweetText = "@" + tweet.user.screen_name + " " + tweetText;
		}
	}
}