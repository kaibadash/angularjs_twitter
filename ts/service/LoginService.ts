
module TwitterApp {
	export class LoginService {
		public static name :string = "LoginService";
		constructor(
	    	public $resource : ng.resource.IResourceService,
	    	public commonService: CommonService) {	
	    }
	}
}