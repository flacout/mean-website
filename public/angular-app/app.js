angular.module('meanhotel',['ngRoute', 'angular-jwt']).config(config).run(run);
// run block is injected at the begining of app

function config($routeProvider, $httpProvider){
    // add the interceptor to config
    // interceptor will do some work at every request
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
    .when('/', {
        templateUrl: 'angular-app/main/main.html',
        // access property, check if a user is login to be able to 
        // the access route 
        access: {
            restricted: false
        }
      })
    .when('/hotels', {
        templateUrl: 'angular-app/hotel-list/hotels.html',
        controller: 'HotelsController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }
    })
    .when('/hotels/:id', {
        templateUrl: 'angular-app/hotel-display/hotel.html',
        controller: 'HotelController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }
    })
    .when('/register', {
        templateUrl: 'angular-app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }
    })
    .when('/profile',{
        templateUrl: 'angular-app/profile/profile.html',
        access: {
            restricted: true
        }
    })
    .otherwise({
        redirectTo: '/'
    });
}

// allow the object property access restricted to work.
function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      // if access.restricted exist in the object
      if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
        // don't navigate to the path
        // send to / path instead
        event.preventDefault();
        $location.path('/');
      }
    });
  }