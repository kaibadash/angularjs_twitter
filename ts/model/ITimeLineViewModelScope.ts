/// <reference path="ITweetList.ts" />
module TwitterApp {
	export interface ITimeLineViewModelScope extends ICommonScope {
		tweetList: Array <ITweet>;
		tweetText: string;
	}
}