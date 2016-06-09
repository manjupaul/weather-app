//Controller

weatherApp.controller('homeController',['$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
       // console.log($scope.city);
    });

}]);
weatherApp.controller('forecastController',['$scope', '$resource', 'cityService', function ($scope, $resource, cityService) {
    $scope.city = cityService.city;
    //url data

    $scope.weatherAPI =
        $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback :"JSON_CALLBACK"},{ get:{method:"JSONP"}});
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: 2, APPID: 'd1865783d21b6e848db41a8a1237d7bb'});

    //covert to farenheit
    $scope.convertToFarenheit = function(degK){
        return Math.round((1.8*(degK - 273))+32);
    }
    //convert to date function
    $scope.convertToDate = function(dt){
        return new Date(dt*1000);

    }

}]);
