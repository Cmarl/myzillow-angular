'use strict';

angular.module('myzillow')
.factory('Home', function(nodeUrl, $http){

  function Home(){}

  Home.create = function(home){
    return $http.post(nodeUrl + '/homes', home);
  };

  Home.getAll = function(){
    return $http.get(nodeUrl + '/homes');
  };

  return Home;

});
