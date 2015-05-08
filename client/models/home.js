'use strict';

angular.module('myzillow')
.factory('Home', function(nodeUrl, $http){

  function Home(){}

  Home.edit = function(home){
    return $http.put(nodeUrl + '/homes/' + home._id, home);
  };

  Home.destroy = function(home){
    return $http.delete(nodeUrl + '/homes/' + home._id);
  };


  Home.create = function(home){
    return $http.post(nodeUrl + '/homes', home);
  };

  Home.getHouses = function(params){
    return $http.get(nodeUrl + '/homes' + params);
  };

  return Home;

});
