var app = require("express")();
var mongoose = require('mongoose');
var seeddb = require("./seed");
mongoose.connect('mongodb://localhost:27017/yelpcamp', {useNewUrlParser: true ,useUnifiedTopology: true});
var Comment  = require("./models/comment");
var camp = require("./models/campground.js");


 var port = 3001;

//  var yelpschema = new  mongoose.Schema({
//      name : String,
//      url : String ,
//      description : String
//  });
//  var camp = mongoose.model("camp",yelpschema );
  
//==================================================

// camp.create({
// name : "place2" ,
// url : "https://www.photosforclass.com/download/pixabay-691424?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d4474856b108f5d084609620367d1c3ed9e04e50744e7c2f78d39144c3_960.jpg&user=Free-Photos "
// },function(err,camp){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(camp);
//     }
// }) 


app.set("view engine","ejs");

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended : true  }));

seeddb();

app.get("/",function(req,res){
    res.render("home");
})


// var camps =[
//     {name : "place1" ,url : "https://www.whatsuplife.in/gurgaon/blog/wp-content/uploads/2014/03/summer-camps-gurgaon.jpg "},
//     {name : "Winters" ,url : "https://www.photosforclass.com/download/pixabay-691424?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d4474856b108f5d084609620367d1c3ed9e04e50744e7c2f78d39144c3_960.jpg&user=Free-Photos "},
//     {name : "place 3" ,url : "https://pixabay.com/get/57e0d6424b56ad14f6da8c7dda793f7f1636dfe2564c704c72267bd7904bcc5e_340.jpg"}
// ]
app.get("/campground",function(req,res){
    
    camp.find({},function(err,camps){
        if(err){
            console.log(err)
        }else{
            console.log("LET SEE....");
          
            res.render("campground",{ camps : camps});
        }

    })
    
    

})

app.post("/campground",function(req,res){
    
   
      camp.create({
        name :req.body.campName, 
        url : req.body.imjUrl,
        description : req.body.description
      },function(err,camps){
          if(err){
              console.log("errr");
              console.log(err);
          }else{
              console.log("ADDED THIS CAMP ....")
              console.log(camps);
          }
      }) 
   
    res.redirect("/campground");
})

app.get("/campground/new",function(req,res){
    
    res.render("new");
})

app.get("/campground/:id",function(req,res){
    
    
    camp.findById(req.params.id).populate("comments").exec( function(err, campsShow ){
        if(err){
           
            console.log(err)

        }else{
             
           
            console.log(campsShow);
           
            res.render("show", { campsShow : campsShow });
        }

    });
    
    

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));