var express = require("express");  //Importing "EXPRESS" in project
var cors = require("cors");        //Importing "CORS" in project
var mongoClient = require("mongodb").MongoClient; //Importing "MONGO DB" in project


var conString = "mongodb://127.0.0.1:27017";  //Converting all database data into a "String" Format

var app = express();   //Creating "API App" for EXPRESS
app.use(cors());       //This "EXPRESS APP" using "CORS"
app.use(express.urlencoded({extended:true})); //Transporting Data from Client to Server
app.use(express.json()); //Converts incoming Data into JSON & aslo to use "POST,PUT,DELETE" features


//Methos used to get the data
// GET Method - ADMIN 
app.get("/admin", (req, res)=>{ 
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tbladmin").find({}).toArray().then((docs)=>{
            res.send(docs); //Start Response Documnet
            res.end();      //End Response
        });
    });
});

//  GET Method - USER
app.get("/users", (req, res)=>{
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tbluser").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        });
    });
});

//  GET Method - CATEGORIES
app.get("/categories", (req, res)=>{
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblcategories").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        });
    });
});

//  GET Method - VIDEOS
app.get("/videos", (req, res)=>{
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblvideos").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        });
    });
});

//  GET Method - SPECIFIC VIDEO
app.get("/video/:id", (req, res)=>{

    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblvideos").find({VideoId:id}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        });
    });
});


//  POST Method -  To ADD new USER
app.post("/adduser", (req, res)=>{

    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    }
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tbluser").insertOne(user).then(()=>{
            console.log('User Added');
            res.redirect("/users");
            res.end();
        })
    });
});


//  POST Method -  To ADD new CATEGORY
app.post("/addcategory", (req, res)=>{

    var category = {
        Category_Id: parseInt(req.body.Category_Id),
        CategoryName: req.body.CategoryName
    };

    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblcategories").insertOne(category).then(()=>{
            console.log('Category Added');
            res.redirect("/categories");
            res.end();
        })
    });
});


//  POST Method -  To ADD new VIDEO
app.post("/addvideo", (req, res)=>{

    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Comments: req.body.Comments,
        Likes : parseInt(req.body.Likes),
        Category_Id: parseInt(req.body.Category_Id)
    }
   
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblvideos").insertOne(video).then(()=>{
            console.log('Video Added');
            res.redirect("/videos");
            res.end();
        })
    });
});


app.put("/editvideo/:id",(req, res)=>{
     var id = parseInt(req.params.id);
     mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblvideos").updateOne({VideoId:id},{$set:{
            VideoId: parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url: req.body.Url,
            Comments: req.body.Comments,
            Likes : parseInt(req.body.Likes),
            Category_Id: parseInt(req.body.Category_Id)
        }})
     }).then(()=>{
        console.log("Video Updated");
       // res.redirect("/videos"); //Server Side Navigation after video updation 
        res.end();
     })
});

app.delete("/deletevideo/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("reactdb");
        database.collection("tblvideos").deleteOne({VideoId:id}).then(()=>{
            console.log("Video Deleted");
            //res.redirect("/videos");  //Server Side Redirection
            res.end();
        })
    })
});


//  POST Method 
app.listen(2200); //Port No
console.log(`Server Started : http://127.0.0.1:2200`);