
module TwitterApp {
	export class TrendDirective implements ng.IDirective {
		static directiveName: string = "trendDirective";
		templateUrl: string = "template/trend.html";
	    restrict: string = "E";
		
	    link(scope: ng.IScope, elem: any, attrs: ng.IAttributes, ctrl: any): void {
	    	// nop
	    }
	}
}