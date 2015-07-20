
module TwitterApp {
	export class TweetDirective implements ng.IDirective {
		static directiveName: string = "tweetDirective";
		controller: string = TweetViewModel.name;
		templateUrl: string = "template/tweet.html";
	    restrict: string = "E";
		// directive が利用される場所での scope を継承する、新たな scope を生成
		scope: boolean = true;
		
	    link(scope: ng.IScope, elem: any, attrs: ng.IAttributes, ctrl: any): void {
	    	// nop
	    }
	}
}