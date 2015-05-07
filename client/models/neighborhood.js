'use strict';

angular.module('myzillow')
.factory('Neighborhood', function(nodeUrl, $http){

  function Neighborhood(){}

  Neighborhood.create = function(neighborhood){
    return $http.post(nodeUrl + '/neighborhoods', neighborhood);
  };

  Neighborhood.getAll = function(){
    return $http.get(nodeUrl + '/neighborhoods');
  };

  return Neighborhood;

});
