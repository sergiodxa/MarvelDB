function searchCtrl($scope) {

	$scope.searchHero = function(hero) {
		window.location = '#/hero/'+hero;
	}
}