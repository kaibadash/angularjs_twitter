
module TwitterApp {
	/**
	 * JSONデータを片付けするためのinterface
	 * @see http://json2ts.com/
	 */
	export interface ITweet extends ng.resource.IResource<ITweet> {
		created_at: string;
    	id:number;
		id_str:string;
	    text: string;
    	source: string;
	    truncated: boolean;
    	in_reply_to_status_id: number;
	    in_reply_to_status_id_str: string;
	    in_reply_to_user_id: number;
	    in_reply_to_user_id_str: string;
	    in_reply_to_screen_name: string;
	    user: any; // TODO: IUser
	    geo:string;
	    coordinates: string;
	    place: string;
	    contributors: string;
	    retweeted_status: ITweet; 
	    retweet_count: number;
	    favorite_count: number;
 	    favorited: boolean;
	    retweeted: boolean;
      	possibly_sensitive: boolean;
	    lang: string;
	}
	
	export interface ITweetListResource extends ng.resource.IResourceClass<ITweet>
	{
	    query() : ITweet[];
	}
}