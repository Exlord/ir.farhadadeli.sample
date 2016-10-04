(function (angular, $, _) {

	angular.module('sample')
	       .config(config)
	       .service('MembershipsService', MembershipsService)
	       .controller('SampleMembershipsCtrl', SampleMembershipsCtrl);

	//////////////////////////////////////////////////////////

	config.$inject = ['$routeProvider'];
	function config($routeProvider, MembershipsService) {
		$routeProvider.when('/memberships', {
			controller  : 'SampleMembershipsCtrl',
			controllerAs: 'ctrl',
			templateUrl : '~/sample/MembershipsCtrl.html',

			// If you need to look up data when opening the page, list it out
			// under "resolve".
			// resolve: {
			// memberships: ['MembershipsService', function (MembershipsService) {
			// 	return MembershipsService.get();
			// }]
			// }
		});
	}

	//////////////////////////////////////////////////////////

	MembershipsService.$inject = ['crmApi', 'crmUiAlert'];
	function MembershipsService(crmApi, crmUiAlert) {

		this.get = function (params) {
			params            = params || {};
			params.sequential = true;
			// params.options.limit

			return crmApi('Membership', 'get', params)
			.then(function (response) {
				return response.values;
			})
			.catch(function (e) {
				crmUiAlert({text: 'There was on error loading the data.', title: 'Error', type: 'error'});
				return null;
			})
		}
	}

	//////////////////////////////////////////////////////////

	SampleMembershipsCtrl.$inject = ['$scope', 'crmApi', 'crmStatus', 'crmUiHelp', 'MembershipsService', 'DTOptionsBuilder', 'DTColumnBuilder'];
	function SampleMembershipsCtrl($scope, crmApi, crmStatus, crmUiHelp, MembershipsService, DTOptionsBuilder, DTColumnBuilder) {
		var vm = this;
		// The ts() and hs() functions help load strings for this module.
		vm.ts  = CRM.ts('sample');
		vm.hs  = crmUiHelp({file: 'CRM/sample/MembershipsCtrl'}); // See: templates/CRM/sample/MembershipsCtrl.hlp
		// vm.memberships = memberships;
		vm.filter     = {
			start_date_from: null,
			start_date_to  : null
		};
		vm.dtInstance = {};
		vm.dtOptions  = null;
		vm.dtColumns  = [
			DTColumnBuilder.newColumn('membership_name').withTitle(vm.ts('Membership Name')),
		];

		vm.search = search;

		activate();
		//////////////////////////////////////////
		function activate() {
			vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
				return loadItems();
			}).withPaginationType('full_numbers');
		}

		function loadItems() {
			var params = {};
			if (vm.filter.start_date_from || vm.filter.start_date_to) {
				params.start_date = {};

				if (vm.filter.start_date_from)
					params.start_date[">="] = vm.filter.start_date_from;

				if (vm.filter.start_date_to)
					params.start_date["<="] = vm.filter.start_date_to;
			}

			return MembershipsService.get(params);
		}

		function search() {
			vm.dtInstance.changeData(loadItems())
		}
	}

})(angular, CRM.$, CRM._);
