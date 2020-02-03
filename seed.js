var camp  = require("./models/campground");
var Comment  = require("./models/comment");
var mongoose = require("mongoose");

data =  [

    {
        name : "leh ladakh" ,
        url : "https://static.toiimg.com/photo/msid-53207997,width-96,height-65.cms",
        description : "we have done many tasks and it was amazing work " 
    },

    
        
    {
        name : "place1" ,
        url : "https://www.whatsuplife.in/gurgaon/blog/wp-content/uploads/2014/03/summer-camps-gurgaon.jpg ",
        description :"allu ka dsf"
       },
       
]

function seeddb(){

    ///remove all camp ground 
    camp.remove({}, (err)=>{
        if(err){
          return   console.log(err);
        }
            console.log("removed");
        

    /// add some camps and comments
    data.forEach(seed=> {
        camp.create(seed , function(err,campground){
            if(err){
               return console.log(err);
            }
             else{

                Comment.create({
                    text : "this is a comment a dummy comnt ",
                    author : "arthor lutkins"
                },(err ,com )=>{
                    if(err){
                        console.log(err);
                    }else{
                        campground.comments.push(com);
                        campground.save();
                        console.log("coment created ???");
                    }
                })
             }
            
        })
    });
    
    });



}
module.exports = seeddb;
