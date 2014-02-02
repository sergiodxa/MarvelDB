function heroCtrl($scope, $routeParams, $http) {

	var apikey		= 'f30150e881221530ec4718bf68af0a18',
		hero		= $routeParams.hero;

	if (localStorage[hero]) {
		var data = JSON.parse(localStorage[hero]);
		$scope.hero	= data.data.results[0];
		$scope.events = data.data.results[0].events.items;
		$scope.urls = data.data.results[0].urls;
	}
	else {
		$http({
			method	: "GET",
			url		: "http://gateway.marvel.com:80/v1/public/characters",
			params	: {
				"name"		: hero,
				"apikey"	: apikey
			}
		})
		.success(function(data) {
			$scope.hero	= data.data.results[0];
			$scope.events = data.data.results[0].events.items;
			$scope.urls = data.data.results[0].urls;
			localStorage.setItem(hero, JSON.stringify(data));
			listOfCharacters();
		});
	}

}