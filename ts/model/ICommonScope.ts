module TwitterApp {
	export interface ICommonScope extends ng.IScope {
		modalTitle: string;
		modalMessage: string;
		modalOk: () => void;
	}
}