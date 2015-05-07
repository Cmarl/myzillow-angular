'use strict';

angular.module('myzillow')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('homes', {url: '/homes', templateUrl: 'views/homes/homes.html', abstract: true})
  .state('homes.add', {url: '/add', templateUrl: 'views/homes/add.html', controller: 'AddCtrl'}) // add a home
  .state('homes.list', {url: '/', templateUrl: 'views/homes/list.html', controller: 'ListCtrl'}); // see on map
  // .state('homes.properties', {url: '/homes', templateUrl: 'views/homes/homes.html', controller: 'HomesCtrl'});
});
