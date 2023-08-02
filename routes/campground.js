var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    middlewareObj = require("../middleware");

// SHOW ALL CAMPGROUNDS
router.get("/", function(req,res){
    //Get campgrounds from the database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campsites: allCampgrounds});
        }
    });
});

// FORM TO ADD NEW CAMPGROUND
router.get("/new", middlewareObj.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//HANDLE FORM DATA FOR NEW CAMPGROUND

router.post("/", middlewareObj.isLoggedIn, function(req, res){
    var name=req.body.name;
    var url=req.body.imgsrc;
    var desc=req.body.desc;
    var author={
        username: req.user.username,
        id: req.user._id
    };
    var newCamp={name: name, image: url, description: desc, author: author};
    console.log(req.user.id);
    // Create a new camp ground
    Campground.create(newCamp, function(err, newlyCreatedCamp){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreatedCamp);
            res.redirect("/campgrounds");
        }
    });
});

// SHOW CAMPGROUND WITH SPECIFIC ID

router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found !");
            res.redirect("back");
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCamp){
        res.render("campgrounds/edit", {campground: foundCamp});
    });
});

//UPDATE
router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) 
});

//DELETE
router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    })
});


module.exports= router;