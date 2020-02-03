var mongoose = require("mongoose");
var yelpschema = new  mongoose.Schema({
    name : String,
    url : String ,
    description : String,
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "comment"
        }
    ]
});

module.exports = mongoose.model("camp",yelpschema );
