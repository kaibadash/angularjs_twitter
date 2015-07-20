module TwitterApp {
	export interface ITweetScope extends ICommonScope {
		tweet: ITweet;
		reply() : void;
		retweet() : void;
		fav() : void;
		menu() : void;	
	}
}