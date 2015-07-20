var TwitterApp;
(function (TwitterApp) {
    var Messages = (function () {
        function Messages() {
        }
        Messages.Reply = "Reply";
        Messages.Fav = "Fav";
        Messages.Retweet = "Retweet";
        return Messages;
    })();
    TwitterApp.Messages = Messages;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var TweetDateFilter = (function () {
        function TweetDateFilter() {
        }
        TweetDateFilter.filter = function (dateString) {
            var date = new Date(dateString);
            var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);
            console.log(days + "日 " + hours + "時間 " + minutes + "分 " + seconds + "秒 ");
            if (days > 0) {
                return days + "日前";
            }
            else if (hours > 0) {
                return hours + "時間前";
            }
            else if (minutes > 0) {
                return minutes + "分前";
            }
            return seconds + "秒前";
        };
        TweetDateFilter.name = "TweetDateFilter";
        return TweetDateFilter;
    })();
    TwitterApp.TweetDateFilter = TweetDateFilter;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var TopViewModel = (function () {
        function TopViewModel($scope, commonService, loginService) {
            this.$scope = $scope;
            this.commonService = commonService;
            this.loginService = loginService;
        }
        TopViewModel.name = "TopViewModel";
        return TopViewModel;
    })();
    TwitterApp.TopViewModel = TopViewModel;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var BaseTimeLineViewModel = (function () {
        function BaseTimeLineViewModel($scope, commonService, timeLineService) {
            this.$scope = $scope;
            this.commonService = commonService;
            this.timeLineService = timeLineService;
            this.replyToTweet = null;
            /* protected */ this._timeLineApiUrl = "";
            this.request();
            // init
            this.$scope.tweetText = "";
            // binding
            $scope.$on(TwitterApp.Messages.Reply, this.recieveReplyEmit.bind(this));
            $scope.$on(TwitterApp.Messages.Fav, this.recieveFavEmit.bind(this));
            $scope.$on(TwitterApp.Messages.Retweet, this.recieveRetweetEmit.bind(this));
            $scope.tweet = this.tweet.bind(this);
            $scope.tweetTextChange = this.tweetTextChange.bind(this);
            // 初期値の反映
            this.tweetTextChange();
        }
        BaseTimeLineViewModel.prototype.request = function () {
            this.$scope.tweetList = this.timeLineService.requestTimeLine();
        };
        /**
         * 編集中のtweetにscreen nameを付加する。
         * in reply toのために対象となるtweetを保持する。
         */
        BaseTimeLineViewModel.prototype.recieveReplyEmit = function (event, tweet) {
            console.log("recieveReplyEmit", tweet);
            this.replyToTweet = tweet;
            this.$scope.tweetText = this.timeLineService.addMentionToTweetText(tweet, this.$scope.tweetText);
            this.tweetTextChange();
        };
        BaseTimeLineViewModel.prototype.recieveFavEmit = function (event, tweet) {
            this.commonService.showModal(this.$scope, "TODO", "いつから実装されていると錯覚していた？");
        };
        BaseTimeLineViewModel.prototype.recieveRetweetEmit = function (event, tweet) {
            this.commonService.showModal(this.$scope, "TODO", "いつから実装されていると錯覚していた？");
        };
        /**
         * tweet本文の変更を検知し、scopeに残り文字数を設定する。
         * この程度であればtemplateでやってしまいたい気になるが極力templateに処理は書かない。
         */
        BaseTimeLineViewModel.prototype.tweetTextChange = function () {
            this.$scope.tweetRemainCount = (140 - this.$scope.tweetText.length);
        };
        BaseTimeLineViewModel.prototype.tweet = function () {
            this.commonService.showModal(this.$scope, "TODO", "いつから実装されていると錯覚していた？");
        };
        return BaseTimeLineViewModel;
    })();
    TwitterApp.BaseTimeLineViewModel = BaseTimeLineViewModel;
})(TwitterApp || (TwitterApp = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="BaseTimeLineViewModel.ts" />
var TwitterApp;
(function (TwitterApp) {
    var HomeTimeLineViewModel = (function (_super) {
        __extends(HomeTimeLineViewModel, _super);
        function HomeTimeLineViewModel($scope, commonService, timeLineService) {
            _super.call(this, $scope, commonService, timeLineService);
            this.$scope = $scope;
            this.commonService = commonService;
            this.timeLineService = timeLineService;
        }
        HomeTimeLineViewModel.name = "HomeTimeLineViewModel";
        return HomeTimeLineViewModel;
    })(TwitterApp.BaseTimeLineViewModel);
    TwitterApp.HomeTimeLineViewModel = HomeTimeLineViewModel;
})(TwitterApp || (TwitterApp = {}));
/// <reference path="BaseTimeLineViewModel.ts" />
var TwitterApp;
(function (TwitterApp) {
    var MentionTimeLineViewModel = (function (_super) {
        __extends(MentionTimeLineViewModel, _super);
        function MentionTimeLineViewModel($scope, commonService, timeLineService) {
            _super.call(this, $scope, commonService, timeLineService);
            this.$scope = $scope;
            this.commonService = commonService;
            this.timeLineService = timeLineService;
        }
        MentionTimeLineViewModel.name = "MentionTimeLineViewModel";
        return MentionTimeLineViewModel;
    })(TwitterApp.BaseTimeLineViewModel);
    TwitterApp.MentionTimeLineViewModel = MentionTimeLineViewModel;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var TweetService = (function () {
        function TweetService($resource, commonService) {
            this.$resource = $resource;
            this.commonService = commonService;
        }
        TweetService.name = "TweetService";
        return TweetService;
    })();
    TwitterApp.TweetService = TweetService;
})(TwitterApp || (TwitterApp = {}));
/// <reference path="../model/ITweetScope.ts" />
/// <reference path="../service/TweetService.ts" />
var TwitterApp;
(function (TwitterApp) {
    var TweetViewModel = (function () {
        function TweetViewModel($scope, commonService, tweetService) {
            this.$scope = $scope;
            this.commonService = commonService;
            this.tweetService = tweetService;
            // binding
            $scope.reply = this.reply.bind(this);
            $scope.retweet = this.retweet.bind(this);
            $scope.fav = this.fav.bind(this);
            $scope.menu = this.menu.bind(this);
        }
        TweetViewModel.prototype.reply = function () {
            this.$scope.$emit(TwitterApp.Messages.Reply, this.$scope.tweet);
        };
        TweetViewModel.prototype.retweet = function () {
            this.$scope.$emit(TwitterApp.Messages.Retweet, this.$scope.tweet);
        };
        TweetViewModel.prototype.fav = function () {
            this.$scope.$emit(TwitterApp.Messages.Fav, this.$scope.tweet);
        };
        TweetViewModel.prototype.menu = function () {
            // TODO:その他のメニューを表示する
        };
        TweetViewModel.name = "TweetViewModel";
        return TweetViewModel;
    })();
    TwitterApp.TweetViewModel = TweetViewModel;
})(TwitterApp || (TwitterApp = {}));
/// <reference path="../model/ITweetList.ts" />
var TwitterApp;
(function (TwitterApp) {
    var BaseTimeLineService = (function () {
        function BaseTimeLineService($resource, commonSercice) {
            this.$resource = $resource;
            this.commonSercice = commonSercice;
            console.log("new BaseTimeLineService", $resource, commonSercice);
        }
        Object.defineProperty(BaseTimeLineService.prototype, "apiUrl", {
            /* abstract protected */
            get: function () {
                throw new Error("not implemented");
            },
            enumerable: true,
            configurable: true
        });
        BaseTimeLineService.prototype.requestTimeLine = function () {
            console.log(this.apiUrl);
            var res = this.$resource(this.apiUrl);
            var tweets = res.query();
            return tweets;
        };
        BaseTimeLineService.prototype.addMentionToTweetText = function (tweet, tweetText) {
            if (tweetText.indexOf("@" + tweet.user.screen_name + " ") >= 0) {
                return tweetText;
            }
            return tweetText = "@" + tweet.user.screen_name + " " + tweetText;
        };
        return BaseTimeLineService;
    })();
    TwitterApp.BaseTimeLineService = BaseTimeLineService;
})(TwitterApp || (TwitterApp = {}));
/// <reference path="ITweetList.ts" />
var TwitterApp;
(function (TwitterApp) {
    var TweetDirective = (function () {
        function TweetDirective() {
            this.controller = TwitterApp.TweetViewModel.name;
            this.templateUrl = "template/tweet.html";
            this.restrict = "E";
            // directive が利用される場所での scope を継承する、新たな scope を生成
            this.scope = true;
        }
        TweetDirective.prototype.link = function (scope, elem, attrs, ctrl) {
            // nop
        };
        TweetDirective.directiveName = "tweetDirective";
        return TweetDirective;
    })();
    TwitterApp.TweetDirective = TweetDirective;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var RecommendUserDirective = (function () {
        function RecommendUserDirective() {
            this.templateUrl = "template/recommend_user.html";
            this.restrict = "E";
        }
        RecommendUserDirective.prototype.link = function (scope, elem, attrs, ctrl) {
            // nop
        };
        RecommendUserDirective.directiveName = "recommendUserDirective";
        return RecommendUserDirective;
    })();
    TwitterApp.RecommendUserDirective = RecommendUserDirective;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var TrendDirective = (function () {
        function TrendDirective() {
            this.templateUrl = "template/trend.html";
            this.restrict = "E";
        }
        TrendDirective.prototype.link = function (scope, elem, attrs, ctrl) {
            // nop
        };
        TrendDirective.directiveName = "trendDirective";
        return TrendDirective;
    })();
    TwitterApp.TrendDirective = TrendDirective;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var MyAccountDirective = (function () {
        function MyAccountDirective() {
            this.templateUrl = "template/my_account.html";
            this.restrict = "E";
        }
        MyAccountDirective.prototype.link = function (scope, elem, attrs, ctrl) {
            // nop
        };
        MyAccountDirective.directiveName = "myAccountDirective";
        return MyAccountDirective;
    })();
    TwitterApp.MyAccountDirective = MyAccountDirective;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var TopMenuDirective = (function () {
        function TopMenuDirective() {
            this.templateUrl = "template/top_menu.html";
            this.restrict = "E";
        }
        TopMenuDirective.prototype.link = function (scope, elem, attrs, ctrl) {
            // nop
        };
        TopMenuDirective.directiveName = "topMenuDirective";
        return TopMenuDirective;
    })();
    TwitterApp.TopMenuDirective = TopMenuDirective;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var CommonService = (function () {
        function CommonService($modal) {
            this.$modal = $modal;
        }
        /**
         * モーダルダイアログを表示する。
         * $scopeはViewとViewModelでのみ使うべきで、Serviceに渡していじくりまわすのはあまり良くない。
         * よってこの部品はあんまり良くない気がする。
         * TODO:引数でコールバック関数を渡すなどして、結果を呼び出し元で受け取るようにすると使い勝手がいいかも。
         */
        CommonService.prototype.showModal = function ($scope, title, message) {
            $scope.modalTitle = title;
            $scope.modalMessage = message;
            var modalInstance = this.$modal.open({
                animation: true,
                templateUrl: "template/modal.html",
                size: "md",
                scope: $scope
            });
            $scope.modalOk = function () {
                modalInstance.close();
            };
        };
        CommonService.name = "CommonService";
        // TODO:TwitterAPIのURL。定数にせず設定ファイルなどに外出しすべき。
        // public static API_BASE_URL: string = "/angularjs_twitter/api_dummy/";
        CommonService.API_BASE_URL = "/api_dummy/";
        return CommonService;
    })();
    TwitterApp.CommonService = CommonService;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var LoginService = (function () {
        function LoginService($resource, commonService) {
            this.$resource = $resource;
            this.commonService = commonService;
        }
        LoginService.name = "LoginService";
        return LoginService;
    })();
    TwitterApp.LoginService = LoginService;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var HomeTimeLineService = (function (_super) {
        __extends(HomeTimeLineService, _super);
        function HomeTimeLineService($resource, commonService) {
            _super.call(this, $resource, commonService);
            this.$resource = $resource;
            this.commonService = commonService;
            console.log("HomeTimeLineService start", $resource, commonService);
        }
        Object.defineProperty(HomeTimeLineService.prototype, "apiUrl", {
            get: function () {
                return TwitterApp.CommonService.API_BASE_URL + "home_timelines.json";
            },
            enumerable: true,
            configurable: true
        });
        HomeTimeLineService.name = "HomeTimeLineService";
        return HomeTimeLineService;
    })(TwitterApp.BaseTimeLineService);
    TwitterApp.HomeTimeLineService = HomeTimeLineService;
})(TwitterApp || (TwitterApp = {}));
var TwitterApp;
(function (TwitterApp) {
    var MentionTimeLineService = (function (_super) {
        __extends(MentionTimeLineService, _super);
        function MentionTimeLineService($resource, commonService) {
            _super.call(this, $resource, commonService);
            this.$resource = $resource;
            this.commonService = commonService;
        }
        Object.defineProperty(MentionTimeLineService.prototype, "apiUrl", {
            get: function () {
                return TwitterApp.CommonService.API_BASE_URL + "mentions_timelines.json";
            },
            enumerable: true,
            configurable: true
        });
        MentionTimeLineService.name = "MentionTimeLineService";
        return MentionTimeLineService;
    })(TwitterApp.BaseTimeLineService);
    TwitterApp.MentionTimeLineService = MentionTimeLineService;
})(TwitterApp || (TwitterApp = {}));
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
var TwitterApp;
(function (TwitterApp) {
    console.log("start TwitterApp");
    var app = angular.module("TwitterApp", ["ngResource", "ui.router", "ui.bootstrap", "ui.bootstrap.modal"]);
    // config
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider.state("top", {
            url: "/",
            templateUrl: "template/top.html",
            controller: TwitterApp.TopViewModel.name
        }).state("home", {
            url: "/home",
            templateUrl: "template/timeline.html",
            controller: TwitterApp.HomeTimeLineViewModel.name
        }).state("mention", {
            url: "/mention",
            templateUrl: "template/timeline.html",
            controller: TwitterApp.MentionTimeLineViewModel.name
        });
    });
    // service
    app.service(TwitterApp.CommonService.name, ["$modal", TwitterApp.CommonService]);
    app.service(TwitterApp.LoginService.name, ["$resource", TwitterApp.CommonService.name, TwitterApp.LoginService]);
    app.service(TwitterApp.HomeTimeLineService.name, ["$resource", TwitterApp.CommonService.name, TwitterApp.HomeTimeLineService]);
    app.service(TwitterApp.MentionTimeLineService.name, ["$resource", TwitterApp.CommonService.name, TwitterApp.MentionTimeLineService]);
    app.service(TwitterApp.TweetService.name, ["$resource", TwitterApp.CommonService.name, TwitterApp.TweetService]);
    // directives
    // XX.name で統一したかったのだが、内部で使用されているらしく大文字になってしまうため、
    // TweetDirective.directiveNameとした。よくわからん。	
    app.directive(TwitterApp.TweetDirective.directiveName, function () { return new TwitterApp.TweetDirective(); });
    app.directive(TwitterApp.RecommendUserDirective.directiveName, function () { return new TwitterApp.RecommendUserDirective(); });
    app.directive(TwitterApp.TrendDirective.directiveName, function () { return new TwitterApp.TrendDirective(); });
    app.directive(TwitterApp.MyAccountDirective.directiveName, function () { return new TwitterApp.MyAccountDirective(); });
    app.directive(TwitterApp.TopMenuDirective.directiveName, function () { return new TwitterApp.TopMenuDirective(); });
    // filter
    app.filter(TwitterApp.TweetDateFilter.name, function () {
        return TwitterApp.TweetDateFilter.filter;
    });
    // viewmodel
    app.controller(TwitterApp.TopViewModel.name, ["$scope", TwitterApp.CommonService.name, TwitterApp.LoginService.name, function ($scope, commonService, loginService) { return new TwitterApp.TopViewModel($scope, commonService, loginService); }]);
    app.controller(TwitterApp.HomeTimeLineViewModel.name, ["$scope", TwitterApp.CommonService.name, TwitterApp.HomeTimeLineService.name, function ($scope, commonService, timeLineService) { return new TwitterApp.HomeTimeLineViewModel($scope, commonService, timeLineService); }]);
    app.controller(TwitterApp.MentionTimeLineViewModel.name, ["$scope", TwitterApp.CommonService.name, TwitterApp.MentionTimeLineService.name, function ($scope, commonService, timeLineService) { return new TwitterApp.MentionTimeLineViewModel($scope, commonService, timeLineService); }]);
    app.controller(TwitterApp.TweetViewModel.name, ["$scope", TwitterApp.CommonService.name, TwitterApp.TweetService.name, function ($scope, commonService, tweetService) { return new TwitterApp.TweetViewModel($scope, commonService, tweetService); }]);
})(TwitterApp || (TwitterApp = {}));
//# sourceMappingURL=twitter.js.map