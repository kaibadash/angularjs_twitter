module TwitterApp {
	export class TweetDateFilter {
		static name: string = "TweetDateFilter";
		static filter(dateString: string) : string {
			var date: Date = new Date(dateString);
			var seconds: number = Math.floor((new Date().getTime() - date.getTime()) / 1000);
			var minutes: number = Math.floor(seconds / 60);
			var hours: number = Math.floor(minutes / 60);
			var days: number = Math.floor(hours / 24);
			console.log(days + "日 " + hours + "時間 " + minutes + "分 " + seconds + "秒 ");
			if (days > 0) {
				return days + "日前";
			} else if (hours > 0) {
				return hours + "時間前";
			} else if (minutes > 0) {
				return minutes + "分前";
			} 
			return seconds + "秒前";
		}
	}
}