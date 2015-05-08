/* jshint camelcase: false*/
'use strict';

angular.module('myzillow')
.controller('ManageCtrl', function($scope, Home, $state, Map){
  Home.getHouses('/' + $scope.activeUser.uid)
  .then(function(response){
    console.log(response);
    $scope.homes = response.data.homes;
  });

  $scope.edit = function(home){
    
  }

  $scope.create = function(home){
    Map.geocode(home.address, function(results){
      if(results && results.length){
        home.address = results[0].formatted_address;
        home.lat = results[0].geometry.location.lat();
        home.lng = results[0].geometry.location.lng();
        home.uid = $scope.activeUser.uid;
        Home.create(home)
        .then(function(){
          $state.go('homes.list');
        });
      }
    });
  };

  $scope.previewFile = function(){
    console.log('you are in the preview File func');
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      preview.src = reader.result;
      $scope.home.photo = reader.result;
    };
    if(file){
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
  };

  $scope.checkImg = function(photo){
    if (photo !== 'default') {
      return photo;
    }
      return '/assets/default.jpg';
  };




});
