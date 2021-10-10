angular.module('chatBotApp.routes', ['ngRoute'])

// configure our routes
.config(function($routeProvider) {
  $routeProvider

    .when('/chatbot', {
    cache: true,
      templateUrl : 'templates/chatbot.html',
      controller  : 'mainController'
    }).otherwise({redirectTo : '/chatbot'})
});