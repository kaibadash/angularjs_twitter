
module TwitterApp {
	export class HomeTimeLineService extends BaseTimeLineService {
		public static name :string = "HomeTimeLineService";
		constructor(
	    	public $resource : ng.resource.IResourceService,
	    	public commonService: CommonService) {
			super($resource, commonService);
			console.log("HomeTimeLineService start", $resource, commonService);	
	    }

	    get apiUrl() : string {
	    	return CommonService.API_BASE_URL + "home_timelines.json";
	    }
	}
}