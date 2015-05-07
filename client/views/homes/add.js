'use strict';

angular.module('myzillow')
.controller('AddCtrl', function($scope, Neighborhood, $state){

  $scope.create = function(neighborhood){
    Neighborhood.create(neighborhood)
    .then(function(){
      $state.go('neighborhoods.list');
    });
  };

});
