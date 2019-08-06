// create an mongo ID for the first review in all document(Hotel) found

db.hotels.update(
    {},
    {
        $set : {
            "reviews.0._id" : ObjectId()
        }
    },
    {
        multi : true
    }
)


db.hotels.update(
    {"name": "Grand Hotel Palatino"},
    {
        $set : {
            "reviews.1._id" : ObjectId()
        }
    },
    {
        multi : true
    }
)
