/* jshint camelcase: false*/
'use strict';

angular.module('myzillow')
.controller('AddCtrl', function($scope, Home, $state, Map){

  $scope.create = function(home){
    previewFile();
    Map.geocode(home.address, function(results){
      if(results && results.length){
        home.address = results[0].formatted_address;
        home.lat = results[0].geometry.location.lat();
        home.lng = results[0].geometry.location.lng();
        Home.create(home)
        .then(function(){
          $state.go('homes.list');
        });
      }
    });
  };

  function previewFile(){
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
  }


});
