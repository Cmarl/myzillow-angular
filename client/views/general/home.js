'use strict';

angular.module('myzillow')
.controller('HomeCtrl', function($state,$scope){

  $scope.search = function(){
    $state.go('homes.list');
  };

});
