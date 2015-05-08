'use strict';

angular.module('myzillow')
.controller('ListCtrl', function(Home, $scope, Map){

  Home.getHouses('')
  .then(function(response){
    $scope.homes = response.data.homes;
    addMarkers();
  });

  var markers = [];

  function addMarkers(){
    clearMarkers();
    markers = $scope.homes.map(function(addy){
      return Map.addMarker(map, addy.lat, addy.lng, addy.address, '/assets/dot.png');
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

  var map = Map.create('#map', 30, -82, 5);


});
