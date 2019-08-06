var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


// localhost:3000/api/hotels/5d1a76afc9a081a5772ac88f/reviews
module.exports.reviewsGetAll = function(req, res){
    var hotelId = req.params.hotelId;
    console.log("GET the hotel :", hotelId);
    Hotel
      .findById(hotelId)
      .select('reviews')  // just select the review not whole Hotel
      .exec(function(err, doc){
        if (err){
          console.log("Error finding reviews");
          res.status(500).json(err);
        }
        else if(!doc){
          res.status(404).json({"message":"Hotel Id doesn't exist"});
        }
        else if (!doc.reviews){
          doc.reviews = [];
          res.status(200).json(doc.reviews);
        }
        else{
          console.log("returned doc", doc);
          res.status(200).json(doc.reviews);
        }
    });
};


// localhost:3000/api/hotels/5d1a76afc9a081a5772ac88f/reviews/5d1d0f6f304fac851bf0e927
module.exports.reviewsGetOne = function(req, res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("GET the review: " + reviewId + " for hotel: " + hotelId);
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
      var response = {
        status: 200,
        body: {}
      };
      if (err){
        console.log("Error finding hotel");
        response.status = 500;
        response.body = err;
      }
      else if(!hotel){
        response.status = 404;
        response.body = {"message" : "Hotel ID not found "};    
      }
      else{
        var review = hotel.reviews.id(reviewId);  // .id method of mongoose
        if (!review){
          response.status = 404;
          response.body = {"message" : "Review ID not found "};  
        }
        else{
          response.body = review;
        }
      }
      res.status(response.status).json(response.body);
    });
};




var _addReview = function(req, res, hotel){
    hotel.reviews.push({
      name : req.body.name,
      rating: parseInt(req.body.rating, 10),
      review: req.body.review
    });
    hotel.save(function(err, hotelUpdated){
      if (err){
        res.status(500).json(err);
      }
      else{
        console.log("inserting new review ");
        // return only the review, which is the last in the array
        res.status(201)
           .json(hotelUpdated.reviews[hotelUpdated.reviews.length-1]);
      }
    });
};

module.exports.reviewsAddOne = function(req, res){
  var hotelId = req.params.hotelId;
  console.log("GET the hotel :", hotelId);
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
      var response = {
        status: 200,
        body: {}
      };
      if (err){
        console.log("Error finding hotel");
        response.status = 500;
        response.body = err;
      }
      else if(!hotel){
        response.status = 404;
        response.body = {"message" : "Hotel ID not found "};    
      }
      if (hotel){
        _addReview(req, res, hotel);
      }
      else{
        res.status(response.status).json(response.body);
      }
    });
};






var _updateReview = function(req, res, hotel){
  var reviewId = req.params.reviewId;
  var review = hotel.reviews.id(reviewId);
  if (!review){
    res.status(404).json({"message" : "Review ID not found "})
  }
  else{
    review.name = req.body.name;
    review.rating = parseInt(req.body.rating, 10);
    review.review = req.body.review;
    hotel.save(function(err, hotelUpdated){
      if (err){
        res.status(500).json(err);
      }
      else{
        // hotelUpdate is empty after an update
        console.log("updating new review ");
        res.status(204).json();
      }
    });
  }
};


module.exports.reviewsUpdateOne = function(req, res){
  var hotelId = req.params.hotelId;
  // Get parent document
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
      var response = {
        status: 200,
        body: {}
      };
      if (err){
        console.log("Error finding hotel");
        response.status = 500;
        response.body = err;
      }
      else if(!hotel){
        response.status = 404;
        response.body = {"message" : "Hotel ID not found "};    
      }
      if (response.status !== 200){
        // if problem finding hotel.
        res
        .status(response.status)
        .json(response.message);
      }
      else{
        _updateReview(req, res, hotel);
      }
    });
};





var _deleteReview = function(req, res, hotel){
  var reviewId = req.params.reviewId;
  var review = hotel.reviews.id(reviewId);
  if (!review){
    res.status(404).json({"message" : "Review ID not found "})
  }
  else{
    hotel.reviews.id(reviewId).remove();
    hotel.save(function(err, hotelUpdated){
      if (err){
        res.status(500).json(err);
      }
      else{
        // hotelUpdate is empty after an update
        console.log("deleting a review ");
        res.status(204).json();
      }
    });
  }
};

module.exports.reviewsDeleteOne = function(req, res){
  var hotelId = req.params.hotelId;
  // Get parent document
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
      var response = {
        status: 200,
        body: {}
      };
      if (err){
        console.log("Error finding hotel");
        response.status = 500;
        response.body = err;
      }
      else if(!hotel){
        response.status = 404;
        response.body = {"message" : "Hotel ID not found "};    
      }
      if (response.status !== 200){
        // if problem finding hotel.
        res
        .status(response.status)
        .json(response.message);
      }
      else{
        _deleteReview(req, res, hotel);
      }
    });
}