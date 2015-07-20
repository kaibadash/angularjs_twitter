
module TwitterApp {
	export class RecommendUserDirective implements ng.IDirective {
		static directiveName: string = "recommendUserDirective";
		templateUrl: string = "template/recommend_user.html";
	    restrict: string = "E";
		
	    link(scope: ng.IScope, elem: any, attrs: ng.IAttributes, ctrl: any): void {
	    	// nop
	    }
	}
}