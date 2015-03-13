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
timerApp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  // Each tab has its own nav history stack:

  $stateProvider.state('tab', {
    url: "/",
    abstract: true,
    templateUrl: "templates/tabs.html"
  });

  $stateProvider.state('stopwatch', {
    url: '/stopwatch',
    views: {
      'stopwatch-tab': {
        templateUrl: 'templates/stopwatch.html'
      }
    }
  });

  $stateProvider.state('countdown', {
    url: '/countdown',
    views: {
      'countdown-tab': {
        templateUrl: 'templates/delete.html'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/dash');
});

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/stopwatch'); }


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
    this.stop();
    totalElapsed = elapsedTime = 0;

  }

  $scope.getTime = function () {
    return totalElapsed + elapsedTime;
  }
}]);


timerApp.controller("countdownController", ['$scope', '$interval', function($scope, $interval) {

  // this will be a user entered value, but let's use a hardcoded value for dev-testing

  $scope.myTime = 0;
  var myCurrentTime = $scope.myTime;
  var startTime;
  var elapsedTime = 0;
  var tick;
  $scope.time = '';

  console.log($scope.myTime + " " + myCurrentTime + " " + startTime + " " + elapsedTime);


  $scope.setCountdown = function(secondsInput) {

    $scope.myTime = secondsInput * 1000; //converts to total ms


  };

  $scope.setSeconds = function (addNum) {
    $scope.time += addNum;

    var sec = parseInt($scope.time);
    if ($scope.time.length > 2) {
      var pivot = $scope.time.length - 2;
      var minsAsSeconds = parseInt($scope.time.substring(0, pivot) * 60);
      sec = minsAsSeconds + parseInt($scope.time.substring(pivot));
    }

    $scope.setCountdown(sec+"");
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
    $scope.time = '';
    myCurrentTime = 0;
  }

  $scope.getCountdownTime = function () {
    var displayTime = myCurrentTime - elapsedTime;
    if (displayTime <= 0 && tick) {
      //displayTime = 0;
      this.stop();
      displayTime = 0;
      alert("LOLOL");

      return displayTime;

    } else {
      if (displayTime < 0) {
        return 0;
      } else {


        return displayTime;
      }
    }
  };



}]);
