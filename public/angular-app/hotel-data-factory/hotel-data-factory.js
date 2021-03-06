angular.module('meanhotel').factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http){
    return{
        hotelList: hotelList,
        hotelDisplay: hotelDisplay,
        postReview: postReview
    };
    function hotelList(id){
        // $http.get('/api/hotels?count=5')
        return $http.get('/api/hotels').then(complete).catch(failed);
    }
    function hotelDisplay(id){
        return $http.get('/api/hotels/' + id).then(complete).catch(failed);
    }

    function postReview(id, review) {
        return $http.post('/api/hotels/'+id+'/reviews', review).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }
    function failed(error){
        console.log(error.statusText);
    }
}