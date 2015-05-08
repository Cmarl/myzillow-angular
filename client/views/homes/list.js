'use strict';

angular.module('myzillow')
.controller('ListCtrl', function($rootScope, Home, $scope, Map, $window){
  Home.getHouses('')
  .then(function(response){
    $scope.homes = response.data.homes;
    addMarkers();
  });
  
  $scope.search = function(query){
    Map.geocode(query, function(data){
      var latS = data[0].geometry.location.A;
      var lngS = data[0].geometry.location.F;
      $scope.map = Map.create('#map', latS, lngS, 7);
      var latMin = latS - 0.1;
      var latMax = latS + 0.1;
      var lngMin = lngS - 0.1;
      var lngMax = lngS + 0.1;
      Home.getHouses('')
      .then(function(response){
        addMarkers();
        $scope.homes = $window._.remove(response.data.homes, function(home){
          return ((home.lat > latMax) || (home.lat < latMin) || (home.lng > lngMax) || (home.lng < lngMin));
        });
        console.log($scope.homes);
      });
    });
  };

  var markers = [];

  function addMarkers(){
    clearMarkers();
    markers = $scope.homes.map(function(addy){
      return Map.addMarker($scope.map, addy.lat, addy.lng, addy.address, '/assets/dot.png');
    });
  }

  function clearMarkers(){
    markers.forEach(function(m){
      m.setMap(null);
    });
      markers = [];
  }

  $scope.checkImg = function(photo){
    if (photo !== 'default') {
      return photo;
    }
      return '/assets/default.jpg';
  };

  $scope.map = Map.create('#map', 30, -82, 5);


});
