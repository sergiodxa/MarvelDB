function characterCtrl($scope, $routeParams, $http) {

	var API_KEY		= 'f30150e881221530ec4718bf68af0a18',
		API_URL		= 'http://gateway.marvel.com:80/v1/public/characters',
		character	= $routeParams.character;

	if (localStorage[character]) {
		var data = JSON.parse(localStorage[character]);
		$scope.character = data.data.results[0];
		if ($scope.character != undefined) {
			$scope.events	= data.data.results[0].events.items;
			$scope.urls		= data.data.results[0].urls;
		}
		else {
			$scope.character = false;
		}
	}
	else {
		$http({
			method	: "GET",
			url		: API_URL,
			params	: {
				"name"		: character,
				"apikey"	: API_KEY
			}
		})
		.success(function(data) {
			$scope.character = data.data.results[0];
			if ($scope.character != undefined) {
				$scope.events	= data.data.results[0].events.items;
				$scope.urls		= data.data.results[0].urls;
				$scope.events	= data.data.results[0].events.items;
				$scope.urls		= data.data.results[0].urls;
				localStorage.setItem(character, JSON.stringify(data));
				listOfCharacters();
			}
			else {
				$scope.character = false;
			}
		});
	}

}
