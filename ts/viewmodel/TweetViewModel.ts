/// <reference path="../model/ITweetScope.ts" />
/// <reference path="../service/TweetService.ts" />
module TwitterApp {
	export class TweetViewModel {
		static name: string = "TweetViewModel";
		constructor(
			public $scope: ITweetScope, 
			public commonService: CommonService,
			public tweetService: TweetService) {
			// binding
			$scope.reply = this.reply.bind(this);
			$scope.retweet = this.retweet.bind(this);
			$scope.fav = this.fav.bind(this);
			$scope.menu = this.menu.bind(this);	
		}
		
		public reply(): void {
			this.$scope.$emit(Messages.Reply, this.$scope.tweet);
		}
		public retweet(): void {
			this.$scope.$emit(Messages.Retweet, this.$scope.tweet);
		}
		public fav(): void {
			this.$scope.$emit(Messages.Fav, this.$scope.tweet);
		}
		public menu(): void {
			// TODO:その他のメニューを表示する
		}
	}
}