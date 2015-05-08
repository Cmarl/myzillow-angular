/* jshint camelcase: false*/
'use strict';

angular.module('myzillow')
.controller('ManageCtrl', function($scope, Home, $state, Map, $window){
  Home.getHouses('/' + $scope.activeUser.uid)
  .then(function(response){
    $scope.homes = response.data.homes;
  });

  $scope.edit = function(home){
    $scope.editing = true;
    $scope.home = home;
  };

  $scope.destroy = function(home){
    Home.destroy(home)
    .then(function(response){
      $window._.remove($scope.homes, function(h){
        return h._id === response.data._id;
      });
    });
  };

  $scope.removeArea = function(query){
    Map.geocode(query, function(data){
      var latS = data[0].geometry.location.A;
      var lngS = data[0].geometry.location.F;
      var latMin = latS - 0.2;
      var latMax = latS + 0.2;
      var lngMin = lngS - 0.2;
      var lngMax = lngS + 0.2;
      Home.getHouses('/' + $scope.activeUser.uid)
      .then(function(response){
        response.data.homes.forEach(function(home){
          if (((home.lat <= latMax) && (home.lat >= latMin) && (home.lng <= lngMax) && (home.lng >= lngMin))){
            Home.destroy(home);
          }
        });
        $scope.homes = $window._.remove(response.data.homes, function(home){
          return !((home.lat <= latMax) && (home.lat >= latMin) && (home.lng <= lngMax) && (home.lng >= lngMin));
        });
        console.log($scope.homes);
      });
    });
  };

  $scope.saveChanges = function(home){
    $scope.editing = false;
    Home.edit(home);
  };

  $scope.create = function(home){
    var fullAddress = [home.address, home.city, home.mailcode, home.country].join(', ');
    Map.geocode(fullAddress, function(results){
      if(results && results.length){
        home.fullAddress = results[0].formatted_address;
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
