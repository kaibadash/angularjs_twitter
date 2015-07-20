/// <reference path="../typings/tsd.d.ts" />
/// <reference path="common/Messages.ts" />
/// <reference path="filter/TweetDateFilter.ts" />
/// <reference path="viewmodel/TopViewModel.ts" />
/// <reference path="viewmodel/BaseTimeLineViewModel.ts" />
/// <reference path="viewmodel/HomeTimeLineViewModel.ts" />
/// <reference path="viewmodel/MentionTimeLineViewModel.ts" />
/// <reference path="viewmodel/TweetViewModel.ts" />
/// <reference path="service/TweetService.ts" />
/// <reference path="service/BaseTimeLineService.ts" />
/// <reference path="model/ICommonScope.ts" />
/// <reference path="model/ITimeLineViewModelScope.ts" />
/// <reference path="view/TweetDirective.ts" />
/// <reference path="view/RecommendUserDirective.ts" />
/// <reference path="view/TrendDirective.ts" />
/// <reference path="view/MyAccountDirective.ts" />
/// <reference path="view/TopMenuDirective.ts" />
/// <reference path="service/CommonService.ts" />
/// <reference path="service/LoginService.ts" />
/// <reference path="service/HomeTimeLineService.ts" />
/// <reference path="service/MentionTimeLineService.ts" />
/// <reference path="service/ITimeLineService.ts" />
/// <reference path="service/TweetService.ts" />

module TwitterApp {
	console.log("start TwitterApp");
	var app: ng.IModule = angular.module("TwitterApp",
		["ngResource", "ui.router", "ui.bootstrap", "ui.bootstrap.modal"]);

	// config
	app.config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void => {
		$urlRouterProvider.otherwise("/");
    	$stateProvider
		.state("top", {
			url: "/",
            templateUrl:"template/top.html",
            controller: TopViewModel.name
		})
        .state("home", {
            url:"/home",
            templateUrl:"template/timeline.html",
            controller: HomeTimeLineViewModel.name
		})
		.state("mention", {
            url:"/mention",
            templateUrl:"template/timeline.html",
            controller: MentionTimeLineViewModel.name
		});
	});

	// service
	app.service(CommonService.name, ["$modal", CommonService]);
	app.service(LoginService.name, ["$resource", CommonService.name, LoginService]);
	app.service(HomeTimeLineService.name, ["$resource", CommonService.name, HomeTimeLineService]);
	app.service(MentionTimeLineService.name, ["$resource", CommonService.name, MentionTimeLineService]);
	app.service(TweetService.name, ["$resource", CommonService.name, TweetService]);
	
	// directives
	// XX.name で統一したかったのだが、内部で使用されているらしく大文字になってしまうため、
	// TweetDirective.directiveNameとした。よくわからん。	
	app.directive(TweetDirective.directiveName, () => new TweetDirective());
	app.directive(RecommendUserDirective.directiveName, () => new RecommendUserDirective());
	app.directive(TrendDirective.directiveName, () => new TrendDirective());
	app.directive(MyAccountDirective.directiveName, () => new MyAccountDirective());
	app.directive(TopMenuDirective.directiveName, () => new TopMenuDirective());
		
	// filter
	app.filter(TweetDateFilter.name, () => {
		return TweetDateFilter.filter;
	});
	
	// viewmodel
	app.controller(TopViewModel.name, 
		["$scope", CommonService.name, LoginService.name, 
			($scope : ng.IScope, commonService: CommonService, loginService: LoginService) 
				=> new TopViewModel($scope, commonService, loginService)
		]
	);
	app.controller(HomeTimeLineViewModel.name, 
		["$scope", CommonService.name, HomeTimeLineService.name, 
			($scope : ITimeLineViewModelScope, commonService: CommonService, timeLineService: ITimeLineService) 
				=> new HomeTimeLineViewModel($scope, commonService, timeLineService)
		]
	);
	app.controller(MentionTimeLineViewModel.name, 
		["$scope", CommonService.name, MentionTimeLineService.name, 
			($scope : ITimeLineViewModelScope, commonService: CommonService, timeLineService: ITimeLineService) 
				=> new MentionTimeLineViewModel($scope, commonService, timeLineService)
		]
	);
	app.controller(TweetViewModel.name, 
		["$scope", CommonService.name, TweetService.name, 
			($scope : ITweetScope, commonService: CommonService, tweetService: TweetService) 
				=> new TweetViewModel($scope, commonService, tweetService)
		]
	);

	
}

