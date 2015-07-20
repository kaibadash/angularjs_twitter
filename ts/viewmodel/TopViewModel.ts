module TwitterApp {
	export class TopViewModel {
		public static name: string = "TopViewModel";

		constructor(public $scope: ng.IScope,
			public commonService: CommonService,
			public loginService: LoginService) {
		}
	}
}