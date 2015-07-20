
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
			// TODO:TimeLineVMはTLのみ管理すべき。外側に全体を管理するVMが必要です。
			$scope.$on(Messages.Reply, this.recieveReplyEmit.bind(this));
			$scope.$on(Messages.Fav, this.recieveFavEmit.bind(this));
			$scope.$on(Messages.Retweet, this.recieveRetweetEmit.bind(this));
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
			// TODO:serviceでやるべき
			// すでにscreen nameを記載している場合は新たに付加しない
			if (this.$scope.tweetText.indexOf("@" + tweet.user.screen_name + " ") >= 0) {
				return;
			}
			this.$scope.tweetText = "@" + tweet.user.screen_name + " " + this.$scope.tweetText; 
		}
		private recieveFavEmit(event: Event, tweet: ITweet): void {
			this.commonService.showModal(this.$scope, "TODO", "いつから実装されていると錯覚していた？");
		}
		private recieveRetweetEmit(event: Event, tweet: ITweet): void {
			this.commonService.showModal(this.$scope, "TODO", "いつから実装されていると錯覚していた？");
		}
	}
}