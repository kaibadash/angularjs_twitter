/// <reference path="BaseTimeLineViewModel.ts" />
module TwitterApp {
	export class HomeTimeLineViewModel extends BaseTimeLineViewModel {
		public static name: string = "HomeTimeLineViewModel";

		constructor(public $scope: ITimeLineViewModelScope,
			public commonService: CommonService,
			public timeLineService: ITimeLineService) {
			super($scope, commonService, timeLineService);
		}
	}
}