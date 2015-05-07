'use strict';

angular.module('myzillow')
.controller('ListCtrl', function(Neighborhood, $scope){

  Neighborhood.getAll()
  .then(function(response){
    $scope.neighborhoods = response.data.neighborhoods;
  });

});
