
module TwitterApp {
	export class CommonService {
		public static name: string = "CommonService";
		// TODO:TwitterAPIのURL。定数にせず設定ファイルなどに外出しすべき。
		public static API_BASE_URL: string = "/angularjs_twitter/api_dummy/";
		
		public constructor(public $modal: ng.ui.bootstrap.IModalService) {

		}
		
		/**
		 * モーダルダイアログを表示する。
		 * $scopeはViewとViewModelでのみ使うべきで、Serviceに渡していじくりまわすのはあまり良くない。
		 * よってこの部品はあんまり良くない気がする。
		 * TODO:引数でコールバック関数を渡すなどして、結果を呼び出し元で受け取るようにすると使い勝手がいいかも。
		 */
		public showModal($scope: ICommonScope, title: string, message: string): void {
			$scope.modalTitle = title;
			$scope.modalMessage = message;
			var modalInstance: ng.ui.bootstrap.IModalServiceInstance = this.$modal.open({
				animation: true,
				templateUrl: "template/modal.html",
				size: "md",
				scope: $scope
			});
			$scope.modalOk = (): void => {
				modalInstance.close();
			};
		}
	}
}