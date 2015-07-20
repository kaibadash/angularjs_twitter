
module TwitterApp {
	export class MentionTimeLineService extends BaseTimeLineService {
		public static name :string = "MentionTimeLineService";
		constructor(
	    	public $resource : ng.resource.IResourceService,
	    	public commonService: CommonService) {
			super($resource, commonService);	
	    }

	    get apiUrl() : string {
	    	return CommonService.API_BASE_URL + "mentions_timelines.json";
	    }
	}
}