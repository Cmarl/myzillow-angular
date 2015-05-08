'use strict';

angular.module('myzillow')
.factory('Map', function($window){
  function Map(){}

  Map.create = function(selector, lat, lng, zoom){
    var options = {
      center: new $window.google.maps.LatLng(lat, lng),
      zoom: zoom,
      mapTypeId: $window.google.maps.MapTypeId.ROADMAP,
      styles: [{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},{'featureType':'landscape','elementType':'all','stylers':[{'color':'#f2f2f2'}]},
      {'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'all','stylers':[{'saturation':-100},{'lightness':45}]},
      {'featureType':'road.highway','elementType':'all','stylers':[{'visibility':'simplified'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'visibility':'simplified'},{'color':'#ff6a6a'},{'lightness':'0'}]},
      {'featureType':'road.highway','elementType':'labels.text','stylers':[{'visibility':'on'}]},{'featureType':'road.highway','elementType':'labels.icon','stylers':[{'visibility':'on'}]},{'featureType':'road.arterial','elementType':'all','stylers':[{'visibility':'on'}]},
      {'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#ff6a6a'},{'lightness':'75'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},
      {'featureType':'road.local','elementType':'geometry.fill','stylers':[{'lightness':'75'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'transit.line','elementType':'all','stylers':[{'visibility':'on'}]},
      {'featureType':'transit.station.bus','elementType':'all','stylers':[{'visibility':'on'}]},{'featureType':'transit.station.rail','elementType':'all','stylers':[{'visibility':'on'}]},
      {'featureType':'transit.station.rail','elementType':'labels.icon','stylers':[{'weight':'0.01'},{'hue':'#ff0028'},{'lightness':'0'}]},
      {'featureType':'water','elementType':'all','stylers':[{'visibility':'on'},{'color':'#80e4d8'},{'lightness':'25'},{'saturation':'-23'}]}]
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
