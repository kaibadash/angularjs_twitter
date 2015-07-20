
module TwitterApp {
	export class MyAccountDirective implements ng.IDirective {
		static directiveName: string = "myAccountDirective";
		templateUrl: string = "template/my_account.html";
	    restrict: string = "E";
		
	    link(scope: ng.IScope, elem: any, attrs: ng.IAttributes, ctrl: any): void {
	    	// nop
	    }
	}
}