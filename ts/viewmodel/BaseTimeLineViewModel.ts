
module TwitterApp {
	export class BaseTimeLineViewModel {
		private replyToTweet: ITweet = null;

		constructor(
			public $scope: ITimeLineViewModelScope, 
			public commonService: CommonService,
			public timeLineService: ITimeLineService) {
			this.request();
			
			// init
			this.$scope.tweetText = "";
			
			// binding
			$scope.$on(Messages.Reply, this.recieveReplyEmit.bind(this));
			$scope.$on(Messages.Fav, this.recieveFavEmit.bind(this));
			$scope.$on(Messages.Retweet, this.recieveRetweetEmit.bind(this));
			$scope.tweet = this.tweet.bind(this);
			$scope.tweetTextChange = this.tweetTextChange.bind(this);
			// 初期値の反映
			this.tweetTextChange();
		}

		/* protected */ _timeLineApiUrl = "";
		
		request() {
			this.$scope.tweetList = this.timeLineService.requestTimeLine();
		}
		/**
		 * 編集中のtweetにscreen nameを付加する。
		 * in reply toのために対象となるtweetを保持する。
		 */
		private recieveReplyEmit(event: Event, tweet: ITweet): void {
			console.log("recieveReplyEmit", tweet);
			this.replyToTweet = tweet;
			this.$scope.tweetText = this.timeLineService.addMentionToTweetText(tweet, this.$scope.tweetText);
			this.tweetTextChange(); 
		}
		private recieveFavEmit(event: Event, tweet: ITweet): void {
			this.commonService.showModal(this.$scope, "TODO", "いつから実装されていると錯覚していた？");
		}
		private recieveRetweetEmit(event: Event, tweet: ITweet): void {
			this.commonService.showModal(this.$scope, "TODO", "いつから実装されていると錯覚していた？");
		}
		/**
		 * tweet本文の変更を検知し、scopeに残り文字数を設定する。
		 * この程度であればtemplateでやってしまいたい気になるが極力templateに処理は書かない。
		 */
		private tweetTextChange(): void {
			this.$scope.tweetRemainCount = (140 - this.$scope.tweetText.length);
		}
		private tweet(): void {
			this.commonService.showModal(this.$scope, "TODO", "いつから実装されていると錯覚していた？");
		}
	}
}