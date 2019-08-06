angular.module('meanhotel').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($window, $q, $location, AuthFactory){
    return {
        request: request,
        response: response,
        responseError: responseError
    };

    function request(config){
        config.headers = config.headers || {};
        // token is in the session add it to the headers for request
        if ($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
    }

    function response(response){
        // first authentication (first login)
        if (response.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            AuthFactory.isLoggedIn = true;
        }
        // unauthorized: not logged in
        if (response.status === 401) {
            AuthFactory.isLoggedIn = false;
        }
        return response || $q.when(response);
    }

    function responseError(rejection){
        if (rejection.status === 401 || rejection.status === 403) {
            delete $window.sessionStorage.token;
            AuthFactory.isLoggedIn = false;
            $location.path('/');
          }
          return $q.reject(rejection);
        }
}
