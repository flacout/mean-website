angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController($route, hotelDataFactory, $routeParams, AuthFactory, jwtHelper, $window){
    var vm = this;
    var id = $routeParams.id;
    hotelDataFactory.hotelDisplay(id).then(function(response){
        console.log(response);
        vm.hotel = response;
        vm.stars = _getStarRating(response.stars);
        console.log("vm.stars", vm.stars);
    });

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
          return true;
        } 
        else {
          return false;
        }
      };

    vm.addReview = function() {
        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;

        var postData = {
          name: username,
          rating: vm.rating,
          review: vm.review
        };
        if (vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id, postData).then(function(response) {
                $route.reload();
            }).catch(function(error) {
                console.log(error);
            });
        } 
        else {
          vm.isSubmitted = true;
        }
      };
}

function _getStarRating(stars){
    return new Array(stars);
}

