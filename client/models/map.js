'use strict';

angular.module('myzillow')
.factory('Map', function($window){
  function Map(){}

  Map.create = function(selector, lat, lng, zoom){
    var options = {
      center: new $window.google.maps.LatLng(lat, lng),
      zoom: zoom,
      mapTypeId: $window.google.maps.MapTypeId.ROADMAP
    };
    selector = angular.element(selector)[0];
    var map = new $window.google.maps.Map(selector, options);
    return map;
  };


  Map.geocode = function(address, cb){
    var geocoder = new $window.google.maps.Geocoder();
    geocoder.geocode({address: address}, cb);
  };

  Map.addMarker = function(map, lat, lng, address, icon){
    var latlng = new $window.google.maps.LatLng(lat, lng);
    var marker = new $window.google.maps.Marker({
      map: map,
      position: latlng,
      title: address,
      animation: $window.google.maps.Animation.DROP,
      icon: icon
    });
    return marker;
  };

  return Map;

});
