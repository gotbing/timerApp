// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var timerApp = angular.module('timerApp', ['ionic'])

/***.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

}); ***/

timerApp.controller("timerController", ['$scope', '$interval', function($scope, $interval) {


  var startTime;
  var totalElapsed = 0;
  var elapsedTime = 0;
  var tick;


  $scope.play = function () {

      if(!tick) {
            startTime = new Date();
            tick = $interval(function () {
              var now = new Date();
              elapsedTime = now.getTime() - startTime.getTime();

            }, 31)
      }


  }

  $scope.stop = function () {
      if (tick) {
        $interval.cancel(tick);
        tick = undefined;
        totalElapsed += elapsedTime;
        elapsedTime = 0;
      }
  }

  $scope.reset = function () {
    startTime = new Date();
    totalElapsed = elapsedTime = 0;

  }

  $scope.getTime = function () {
    return totalElapsed + elapsedTime;
  }
}]);
