/// <reference path="BaseTimeLineViewModel.ts" />
module TwitterApp {
	export class MentionTimeLineViewModel extends BaseTimeLineViewModel {
		public static name: string = "MentionTimeLineViewModel";

		constructor(public $scope: ITimeLineViewModelScope,
			public commonService: CommonService,
			public timeLineService: ITimeLineService) {
			super($scope, commonService, timeLineService);
		}
	}
}