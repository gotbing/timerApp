// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var countdownApp = angular.module('countdownApp', ['ionic'])

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

countdownApp.controller("countdownController", ['$scope', '$interval', function($scope, $interval) {

  // this will be a user entered value, but let's use a hardcoded value for dev-testing

  $scope.myTime = 0;
  var myCurrentTime = $scope.myTime;
  var startTime;
  var elapsedTime = 0;
  var tick;
  $scope.seconds = '';

  console.log($scope.myTime + " " + myCurrentTime + " " + startTime + " " + elapsedTime);


  $scope.setCountdown = function(sec) {

    $scope.myTime = sec * 1000;


  };

  $scope.setSeconds = function (addNum) {
    $scope.seconds += addNum;
    $scope.setCountdown($scope.seconds);
    myCurrentTime = $scope.myTime;
  }


  $scope.play = function () {
    if(!tick && myCurrentTime > 0) {
      startTime = new Date();
      tick = $interval(function () {

        if (elapsedTime >= $scope.myTime) {
          $scope.stop();
        } else {

            var now = new Date();
            elapsedTime = now.getTime() - startTime.getTime();
            // myCurrentTime -= elapsedTime;
          }
      }, 31)

    }
  };

  $scope.stop = function () {
    if (tick) {
      $interval.cancel(tick);
      tick = undefined;
      myCurrentTime -= elapsedTime;
      elapsedTime = 0;
    }
  };

  $scope.reset = function () {


      $interval.cancel(tick);
      tick = undefined;
      elapsedTime = 0;
      startTime = new Date();
      myCurrentTime = $scope.myTime;

  };

  $scope.clear = function () {
      $scope.reset();
      $scope.seconds = '';
      myCurrentTime = 0;
  }

  $scope.getCountdownTime = function () {
    var displayTime = myCurrentTime - elapsedTime;
    if (displayTime <= 0) {
      displayTime = 0;
      this.stop();
      //alert("LOLOL");
    }

    return displayTime;
  };



}]);
