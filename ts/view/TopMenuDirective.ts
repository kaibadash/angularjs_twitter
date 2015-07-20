
module TwitterApp {
	export class TopMenuDirective implements ng.IDirective {
		static directiveName: string = "topMenuDirective";
		templateUrl: string = "template/top_menu.html";
	    restrict: string = "E";
		
	    link(scope: ng.IScope, elem: any, attrs: ng.IAttributes, ctrl: any): void {
	    	// nop
	    }
	}
}