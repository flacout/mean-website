var mongoose = require('mongoose');


var reviewSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        required : true
    },
    review : {
        type: String,
        required : true
    },
    createdOn : {
        type : Date,
        default : Date.now
    }
});

var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    despriction : String,
    photos : [String],
    price : Number
});


// The Schema is defined as a javascript object. (make sense)
var hotelSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    stars : {
        type : Number,
        min : 0,
        max : 5,
        default : 0
    },
    services : [String],
    description : String,
    photos : [String],
    currency : String,
    reviews : [reviewSchema], // array of subdocuments.
    rooms : [roomSchema],
    location : {
        address : String,
        // Always store coordinates long , lat
        coordinates : {
            type : [Number],
            index : '2dsphere'
        }
    }
});



// compile the model.
// args: name of model (document), schema var, name of collection.
mongoose.model('Hotel', hotelSchema, 'hotels');