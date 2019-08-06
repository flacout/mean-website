var express = require('express');
var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

var router = express.Router();


// localhost:3000/api/hotels
router
  .route('/hotels')
  // middleware authenticate execute first next exec hotelsGetAll (with new param username)
  .get(ctrlUsers.authenticate, ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);

// In express a ':' will define a URL parameter
// example localhost:3000/api/hotels/1245
router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne)
  .delete(ctrlHotels.hotelsDeleteOne);


// reviews route
// localhost:3000/api/hotels/1234/reviews
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);

// localhost:3000/api/hotels/1245/reviews/68877
router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);


// authentication
router
.route('/users/register')
.post(ctrlUsers.register)

router
.route('/users/login')
.post(ctrlUsers.login)

module.exports = router;