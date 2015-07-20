
module TwitterApp {
	export class TweetService {
		public static name :string = "TweetService";
		constructor(
	    	public $resource : ng.resource.IResourceService,
	    	public commonService: CommonService) {	
	    }
	}
}